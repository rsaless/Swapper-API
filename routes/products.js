module.exports = function (app) {

    app.post('/user/:id/produtos/cadastra', function (req, res) {

        var id = req.params.id;
        console.log(req.body);
        var produto = req.body["produto"];
        console.log("processando o cadastro de um novo produto");
        produto.status = 'DISPONIVEL';
        produto.user_id = id;

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.cadastra_produto(produto, function (erro, resultado) {
            if (erro){
                console.log('Erro ao inserir o novo produto no banco: ' + erro);
                res.status(500).send(erro);
            } else {
                produto.id = resultado.insertId;
                console.log('Produto ' + produto.nome + ' cadastrado com sucesso!');

                var response = {
                    dados_do_produto: produto,
                    links: [
                        {
                            href:"http://localhost:3000/user/"+ produto.user_id +"/produtos/"+ produto.id + "/edita",
                            rel:"atualizar_produto",
                            method:"PUT"
                        },
                        {
                            href:"http://localhost:3000/user/"+ produto.user_id +"/produtos/"+ produto.id + "/remove",
                            rel:"remover_produto",
                            method:"DELETE"
                        },
                        {
                            href:"http://localhost:3000/user/"+ produto.user_id +"/produtos/"+ produto.id,
                            rel:"listar_dados_do_produto",
                            method:"GET"
                        }
                    ]
                };

                res.status(201).json(response);
            }
        });
    });
    app.get('/user/:id/produtos', function(req, res){
        var id = req.params.id;
        console.log('consultando os produtos do usuário: ID = ' + id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.lista_produtos_usuario(id, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar produtos no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log(resultado);
                console.log('produtos encontrados: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        })
    });

    app.get('/anuncios/produtos/:categoria', function(req, res){
        var categoria = req.params.categoria;
        console.log('consultando produtos anunciados da cetegoria = ' + categoria);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.busca_produtos_categoria(categoria, function(erro, resultado){
            if (erro){
                console.log('erro ao consultar anuncios no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('anuncios encontrados: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        })
    });



    app.get('/user/:user_id/produtos/:id', function(req, res){
        var user_id = req.params.user_id;
        var id = req.params.id;
        console.log('consultando o produto de ID = '+ id + ' do usuário de USER_ID = ' + user_id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.busca_produto_usuario(user_id, id, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar produtos no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('produto encontrado: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        })
    });
    app.put('/user/:user_id/produtos/:id/edita', function (req, res) {

        var produto = req.body["produto"];
        produto.id = req.params.id;
        produto.user_id = req.params.user_id;

        console.log("processando alterações no produto");

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.edita_produto(produto, produto.user_id, produto.id, function (erro, resultado) {
            if (erro){
                console.log('Erro ao alterar o produto no banco: ' + erro);
                res.status(500).send(erro);
            } else {
                console.log('Produto alterado com sucesso!');

                var response = {
                    dados_do_produto: produto,
                    links: [
                        {
                            href:"http://localhost:3000/user/"+ produto.user_id +"/produtos/"+ produto.id + "/edita",
                            rel:"atualizar_produto",
                            method:"PUT"
                        },
                        {
                            href:"http://localhost:3000/user/"+ produto.user_id +"/produtos/"+ produto.id + "/remove",
                            rel:"remover_produto",
                            method:"DELETE"
                        },
                        {
                            href:"http://localhost:3000/user/"+ produto.user_id +"/produtos/"+ produto.id,
                            rel:"listar_dados_do_produto",
                            method:"GET"
                        }
                    ]
                };

                res.status(200).json(response);
            }
        });
    });
    app.delete('/user/:user_id/produtos/:id/remove', function (req, res) {
        var produto = {};
        produto.id = req.params.id;
        produto.user_id = req.params.user_id;
        produto.status = "REMOVIDO";
        console.log('Removendo o produto: ID = ' + produto.id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.remove_produto(produto, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar produto no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('Produto removido com sucesso!');
                res.status(200).send('Produto removido com sucesso!');
                return;
            }
        });
    });
};