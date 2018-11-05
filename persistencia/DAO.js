function DAO(connection) {
    this._connection = connection;
}

module.exports = function(){
    return DAO;
};

DAO.prototype.cadastra_usuario = function(usuario, callback){
    this._connection.query('INSERT INTO users SET ?', usuario, callback);
};

DAO.prototype.atualiza_usuario = function(usuario, callback){
    this._connection.query('UPDATE users SET nome = ? where id = ?', [usuario.nome, usuario.id], callback);
};

DAO.prototype.busca_usuario = function(id, callback){
    this._connection.query('SELECT * FROM users WHERE id = ?', [id], callback);
};