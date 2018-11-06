module.exports = function (app) {

    app.get('/user/:user_id/propostas/recebidas', function(req, res){
        var user_id = req.params.user_id;
        console.log('consultando as propostas recebidas do usuário de USER_ID = ' + user_id);

        var connection = app.persistencia.connectionFactory();
        var dao = new app.persistencia.DAO(connection);

        dao.propostas_recebidas(user_id, function (erro, resultado) {
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
    app.post('/proposta/:id1/:id2/:p1/:p2', function (req, res) {
        var proposta = req.body["proposta"];

        proposta.dono_ofertado = req.params.id1;
        proposta.dono_desejado = req.params.id2;
        proposta.produto_ofertado = req.params.p1;
        proposta.produto_desejado = req.params.p2;
        proposta.data_criacao = new Date;

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