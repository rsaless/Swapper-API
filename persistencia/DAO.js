function DAO(connection) {
    this._connection = connection;
}

module.exports = function(){
    return DAO;
};

DAO.prototype.cadastra_usuario = function(usuario, callback){
    this._connection.query('INSERT INTO users SET ?', usuario, callback);
};
DAO.prototype.atualiza_usuario = function(usuario, id, callback){
    this._connection.query('UPDATE users SET ? where id = ?', [usuario, id], callback);
};
DAO.prototype.remove_usuario = function(usuario, callback){
    this._connection.query('UPDATE users SET status = ? where id = ?',[usuario.status, usuario.id], callback);
};
DAO.prototype.busca_usuario = function(id, callback){
    this._connection.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

DAO.prototype.lista_produtos_usuario = function(user_id, callback){
    this._connection.query('SELECT * FROM produtos WHERE user_id = ?', [user_id], callback);
};
DAO.prototype.busca_produto_usuario = function(user_id, id, callback){
    this._connection.query('SELECT * FROM produtos WHERE user_id = ? and id = ?', [user_id, id], callback);
};
DAO.prototype.cadastra_produto = function (produto, callback) {
    this._connection.query('INSERT INTO produtos SET ?', produto, callback)
};
DAO.prototype.edita_produto = function (produto, user_id, id, callback) {
    this._connection.query('UPDATE produtos SET ? where user_id = ? and id = ?', [produto, produto.user_id, produto.id], callback);
};
DAO.prototype.remove_produto = function (produto, callback) {
    this._connection.query('UPDATE produtos SET status = ? where user_id = ? and id = ?',[produto.status, produto.user_id, produto.id], callback);
};

DAO.prototype.propostas_recebidas = function (id, callback) {
    this._connection.query('SELECT * FROM propostas where dono_desejado = ?', [id], callback);
};
DAO.prototype.propostas_realizadas = function (id, callback) {
    this._connection.query('SELECT * FROM propostas where dono_ofertado = ?', [id], callback);
};
DAO.prototype.realizar_proposta = function (proposta, callback) {
    this._connection.query('INSERT INTO propostas SET ?', proposta, callback);
};
DAO.prototype.listar_propostas_produto = function (user_id, prod_id, callback) {
    this._connection.query('SELECT * FROM propostas where dono_desejado = ? and produto_desejado = ?', [user_id, prod_id], callback);
};
DAO.prototype.buscar_proposta_produto = function (user_id, prod_id, prop_id, callback) {
    this._connection.query('SELECT * FROM propostas where dono_desejado = ? and produto_desejado = ? and id = ?',
        [user_id, prod_id, prop_id], callback);
};
DAO.prototype.aceitar_recusar_proposta = function (proposta, callback){
    this._connection.query('UPDATE propostas SET status = ? where dono_desejado = ? and produto_desejado = ? and id = ?',
        [proposta. status, proposta.user_id, proposta.prod_id, proposta.prop_id], callback);
};