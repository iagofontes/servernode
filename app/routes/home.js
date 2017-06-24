module.exports = function(app){

    app.get('/', function(request, response){
        
        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
        produtosBanco.lista(function(err, result){
            response.render('../public/index', {livros: result});
        });
        connection.end();
    });
}