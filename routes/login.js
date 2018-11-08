const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const verify = promisify(jwt.verify);
module.exports = function(app){

    app.post('/user/login', function(req, res) {
        req.assert("login.username", "campo \"Usuário\" é obrigatorio").notEmpty();
        req.assert("login.password", "campo \"Senha\" é obrigatorio").notEmpty();

        var erros = req.validationErrors();
        if (erros){
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }

        var user_login = req.body["login"];
        console.log('Iniciando tentativa de login');

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.fazer_login(user_login, function (erro, resultado) {
            if (erro){
                console.log('Erro ao buscar usuário no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                if (resultado.length){
                    console.log('Usuário encontrado: ' + JSON.stringify(resultado[0]));
                    console.log('Preparando o Token de acesso');

                    const user = resultado[0];
                    const token = jwt.sign({user}, 'secret', { algorithm: 'HS256',expiresIn: "24h"});
                    res.set('x-access-token', token);
                    console.log(token);

                    var response = {
                        usuario_logado: resultado[0],
                        token: token
                    };

                    res.status(200).json(response);

                    return;
                } else {
                    console.log('Email ou senha incorretos!');
                    res.status(400).json('Email ou senha incorretos!');
                    return;
                }
            }
        });
    });

    app.verifica = async function (req, res, next) {
        const token = req.headers['x-access-token'];
        if (token){
            try {
                const decoded = await verify(token, 'secret');
                console.log("Token válido recebido: " + token);
                req.user = decoded;
                next();
            } catch (err) {
                console.log(err);
                console.log("Token inválido: " + token);
                return res.status(401).send(err);
            }
        } else {
            console.log("Token inexistente!");
            return res.status(401).send("Token inexistente!");
        }
    }
};

