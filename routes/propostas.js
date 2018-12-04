module.exports = function (app) {

    app.get('/anuncio/:anuncio_id/propostas/recebidas', function(req, res){
        var anuncio_id = req.params.anuncio_id;
        console.log('consultando as propostas recebidas do anuncio = ' + anuncio_id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.propostas_recebidas(anuncio_id, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar propostas recebidas no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('propostas recebidas: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        });
    });
    app.get('/user/:user_id/propostas/feitas', function(req, res){
        var user_id = req.params.user_id;
        console.log('consultando as propostas realizadas do usuário de USER_ID = ' + user_id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.propostas_realizadas(user_id, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar propostas realizadas no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('propostas realizadas: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        });
    });
    app.get('/user/:user_id/produtos/:prod_id/propostas', function (req, res) {
        var user_id = req.params.user_id;
        var prod_id = req.params.prod_id;

        console.log('consultando as propostas realizadas ao produto '+ prod_id + ' do usuário ' + user_id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.listar_propostas_produto(user_id, prod_id, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar propostas realizadas no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('propostas realizadas ao produto: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        });
    });
    app.get('/user/:user_id/produtos/:prod_id/propostas/:prop_id', function (req, res) {
        var user_id = req.params.user_id;
        var prod_id = req.params.prod_id;
        var prop_id = req.params.prop_id;

        console.log('buscando pela proposta de ID = ' + prop_id + ' no produdo ' + prod_id + ' do usuário ' + user_id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.buscar_proposta_produto(user_id, prod_id, prod_id, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar propostas realizadas no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('propostas encontrada: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        });
    });

    app.get('/user/:user_id/anuncios', function(req,res){

        var user_id = req.params.user_id;
        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);
        console.log("teste");
        dao.consulta_anuncios(user_id, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar anuncios no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('Anuncios encontrados: ' + JSON.stringify(resultado));
                res.status(200).json(resultado);
                return;
            }
        });
    });

    app.post('/user/:user_id/produto/:prod_id/anuncio', function(req, res){
        
    
        var user_id = req.params.user_id;
        var prod_id = req.params.prod_id;

        var anuncio = req.body["anuncio"];
        anuncio.id_anunciante = user_id;
        anuncio.id_produto = prod_id;

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.cadastra_anuncio(anuncio, function(erro, resultado){
            if(erro){
                console.log('erro ao criar anuncio ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                
                console.log(resultado);
                res.status(200).json(resultado);
                return;
            }
        });
    });


    app.post('/user/:user_id/produtos/:prod_id/propostas/:prop_id/aceitar', function (req, res) {
        var proposta = {};
        proposta.user_id = req.params.user_id;
        proposta.prod_id = req.params.prod_id;
        proposta.prop_id = req.params.prop_id;
        proposta.status = 'ACEITO';

        console.log('preparando para aceitar proposta');

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.aceitar_recusar_proposta(proposta, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar propostas no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('Proposta aceita com sucesso!');
                res.status(200).send('Proposta aceita com sucesso!');
                return;
            }
        });
    });
    app.post('/user/:user_id/produtos/:prod_id/propostas/:prop_id/recusar', function (req, res) {
        var proposta = {};
        proposta.user_id = req.params.user_id;
        proposta.prod_id = req.params.prod_id;
        proposta.prop_id = req.params.prop_id;
        proposta.status = 'RECUSADO';

        console.log('preparando para recusar proposta');

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.aceitar_recusar_proposta(proposta, function (erro, resultado) {
            if(erro){
                console.log('erro ao consultar propostas no banco: ' + erro);
                res.status(500).send(erro);
                return;
            } else {
                console.log('Proposta recusada com sucesso!');
                res.status(200).send('Proposta recusada com sucesso!');
                return;
            }
        });
    });
    app.post('/user/:user_id/produtos/:produto_id/proposta/:anuncio_id', function (req, res) {
        var proposta = req.body["proposta"];

        proposta.dono_ofertado = req.params.user_id;
        proposta.produto_ofertado = req.params.produto_id;
        proposta.anuncio_id = req.params.anuncio_id;
        proposta.status = 'EM ABERTO';

        console.log('Preparando para realizar nova proposta');

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.realizar_proposta(proposta, function (erro, resultado) {
            if(erro){
                console.log('erro ao salvar proposta no banco: ' + erro);
                res.status(500).send(erro);
            } else {
                console.log('proposta realizada com sucesso!');

                proposta.id = resultado.insertId;

                var response = {
                    dados_do_usuario: proposta,
                    links: [
                        {
                            href:"http://localhost:3000/user/"+ proposta.dono_desejado +"/propostas/"+ proposta.id +"/aceitar",
                            rel:"aceitar_proposta",
                            method:"POST"
                        },
                        {
                            href:"http://localhost:3000/user/"+ proposta.dono_desejado +"/propostas/"+ proposta.id +"/recusar",
                            rel:"recusar_proposta",
                            method:"POST"
                        }
                    ]
                };
                res.status(201).json(response);
            }
        });
    });
};