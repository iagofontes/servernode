module.exports = function(app){

    app.get('/promocoes/form', function(req, resp){
        ret = [];
        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
        produtosBanco.lista(function(error, response){
            resp.render('promocoes/form', {livro:response});
        });
        connection.end();
    });

    app.post('/promocoes', function(req, resp){
        var promo = req.body;
        app.get('io').emit('novaPromocao', promo);
        resp.redirect('/promocoes/form');
    });

}