module.exports = function (app) {

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
                console.log('Usuário ' + usuario.nome + ' ' + usuario.sobrenome + ' cadastrado com sucesso!');

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
}