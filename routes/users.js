module.exports = function (app) {

    function nome_completo(usuario){
        return usuario.nome + " " + usuario.sobrenome;
    }

    // Cadastra um novo usuário
    app.post('/user/cadastro', function (req, res) {

        req.assert("usuario.nome", "campo \"Nome\" é obrigatorio").notEmpty();
        req.assert("usuario.sobrenome", "campo \"Sobrenome\" é obrigatorio").notEmpty();
        req.assert("usuario.email", "campo \"Email\" é obrigatorio").notEmpty();
        req.assert("usuario.usuario", "campo \"Usuário\" é obrigatorio").notEmpty();        req.assert("usuario.senha", "campo \"Senha\" é obrigatorio").notEmpty();
        req.assert("usuario.senha", "campo \"Senha\" é obrigatorio").notEmpty();
        req.assert("usuario.celular", "campo \"Celular\" é obrigatorio").notEmpty();        req.assert("usuario.senha", "campo \"Senha\" é obrigatorio").notEmpty();
        req.assert("usuario.endereco", "campo \"Endereço\" é obrigatorio").notEmpty();
        req.assert("usuario.numero", "campo \"Número\" é obrigatorio").notEmpty();
        req.assert("usuario.cidade", "campo \"Cidade\" é obrigatorio").notEmpty();

        req.assert("usuario.email", "Email inválido").isEmail();
        req.assert("usuario.numero", "Número inválido").isInt();

        var erros = req.validationErrors();
        if (erros){
            console.log('Erros de validação encontrados');
            res.json(erros);
            return;
        }

        var usuario = req.body["usuario"];
        console.log("processando o cadastro de um novo usuário");
        usuario.status = 'ATIVO';

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.cadastra_usuario(usuario, function (erro, resultado) {
            if (erro){
                console.log('Erro ao inserir o novo usuário no banco: ' + erro);
                res.json(erro);
                console.log(erro);
            } else {
                usuario.id = resultado.insertId;
                console.log('Usuário ' + nome_completo(usuario) + ' cadastrado com sucesso!');

                var response = {
                    dados_do_usuario: usuario,
                    links: [
                        {
                            href:"http://localhost:3000/user/"+ usuario.id +"/atualiza/",
                            rel:"atualizar_usuario",
                            method:"PUT"
                        },
                        {
                            href:"http://localhost:3000/user/"+ usuario.id +"/remove/",
                            rel:"remover_usuario",
                            method:"DELETE"
                        },
                        {
                            href:"http://localhost:3000/user/"+ usuario.id +"/produtos/",
                            rel:"listar_produtos_do_usuario",
                            method:"GET"
                        },
                        {
                            href:"http://localhost:3000/user/"+ usuario.id,
                            rel:"ver_perfil_do_usuario",
                            method:"GET"
                        },
                    ]
                };

                res.status(201).send(usuario);
                console.log(response);
            }
        });
    });

    // Atualiza os dados de um usuário já cadastrado
    app.put('/user/:id/atualiza', function (req, res) {

        var usuario = req.body["usuario"];
        usuario.id = req.params.id;
        console.log("processando alterações no usuário " + nome_completo(usuario));

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.atualiza_usuario(usuario, usuario.id, function (erro, resultado) {
            if (erro){
                console.log('Erro ao alterar o usuário no banco: ' + erro);
                res.status(500).send(erro);
            } else {
                console.log('Usuário ' + usuario.nome + ' ' + usuario.sobrenome + ' alterado com sucesso!');

                var response = {
                    dados_do_usuario: usuario,
                    links: [
                        {
                            href:"http://localhost:3000/user/"+ usuario.id +"/atualiza/",
                            rel:"atualizar_usuario",
                            method:"PUT"
                        },
                        {
                            href:"http://localhost:3000/user/"+ usuario.id +"/remove/",
                            rel:"remover_usuario",
                            method:"DELETE"
                        },
                        {
                            href:"http://localhost:3000/user/"+ usuario.id +"/produtos/",
                            rel:"listar_produtos_do_usuario",
                            method:"GET"
                        },
                        {
                            href:"http://localhost:3000/user/"+ usuario.id,
                            rel:"ver_perfil_do_usuario",
                            method:"GET"
                        },
                    ]
                };

                res.status(200).json(response);
            }
        });
    });

    // Retorna os dados de um usuário
    app.get('/user/:username', function (req, res) {
        var username = req.params.username;
        console.log('consultando dados do usuario ' + username);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.busca_usuario(username, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar usuário no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('Usuário encontrado: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        });
    });

    // Deleta um usuário
    app.delete('/user/:id/remove', function (req, res) {
        var usuario = {};
        usuario.id = req.params.id;
        usuario.status = "INATIVO";
        console.log('Removendo o usuario: ID = ' + usuario.id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.remove_usuario(usuario, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar usuário no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('Usuário removido com sucesso!');
                res.status(200).send('Usuário removido com sucesso!');
                return;
            }
        });
    });
};