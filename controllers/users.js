module.exports = function (app) {

    function nome_completo(usuario){
        return usuario.nome + " " + usuario.sobrenome;
    };

    app.post('/user/cadastro', function (req, res) {
        req.assert("usuario.nome", "campo \"Nome\" é obrigatorio").notEmpty();
        req.assert("usuario.sobrenome", "campo \"Sobrenome\" é obrigatorio").notEmpty();
        req.assert("usuario.email", "campo \"Email\" é obrigatorio").notEmpty();
        req.assert("usuario.senha", "campo \"Senha\" é obrigatorio").notEmpty();
        req.assert("usuario.celular", "campo \"Celular\" é obrigatorio").notEmpty();

        var erros = req.validationErrors();
        if (erros){
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
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
                res.status(500).send(erro);
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

                res.status(201).json(response);
            }
        });
    });

    app.put('/user/:id/atualiza', function (req, res) {
        req.assert("usuario.nome", "campo \"Nome\" é obrigatorio").notEmpty();
        req.assert("usuario.sobrenome", "campo \"Sobrenome\" é obrigatorio").notEmpty();
        req.assert("usuario.email", "campo \"Email\" é obrigatorio").notEmpty();
        req.assert("usuario.senha", "campo \"Senha\" é obrigatorio").notEmpty();
        req.assert("usuario.celular", "campo \"Celular\" é obrigatorio").notEmpty();

        var erros = req.validationErrors();
        if (erros){
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }

        var usuario = req.body["usuario"];
        console.log("processando alterações no usuário " + nome_completo(usuario));

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.atualiza_usuario(usuario, function (erro, resultado) {
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

    app.get('/user/:id', function (req, res) {
        var id = req.params.id;
        console.log('consultando dados do usuario: ID = ' + id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.busca_usuario(id, function (erro, resultado) {
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
};