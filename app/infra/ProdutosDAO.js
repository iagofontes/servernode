function ProdutosDAO(connection){
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
    this._connection.query('SELECT * FROM livros', callback);
}

ProdutosDAO.prototype.gravar = function(produto, callback){
    this._connection.query('insert into livros set ?', produto, callback);
}

ProdutosDAO.prototype.buscarProduto = function(id, callback){
    // console.log('SELECT * FROM livros WHERE id = '+id);
    this._connection.query('SELECT * FROM livros WHERE id = ?', id, callback);
    // this._connection.query('SELECT * FROM livros', callback);
}

ProdutosDAO.prototype.removerProduto = function(id, callback){
    // console.log(id);
    this._connection.query('DELETE FROM livros WHERE id = ?', id, callback);
}

module.exports = function(){
    return ProdutosDAO;
}

/*
module.exports = function(){
    return function(connection){

        this.lista = function(callback){
            connection.query('SELECT * FROM livros', callback);
        }
        return this;
    }
}*/