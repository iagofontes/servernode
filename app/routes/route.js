// var connectionFactory = require('../infra/connectionFactory');
module.exports = function(app){

    app.get('/teste', (request, response, next) => {
        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
        produtosBanco.lista(function(error, result){
            //response.render('produtos/lista', {lista: result});
            if(error){
                return next(error);
            }
            response.json(result);
        });
    });

    app.get('/lista', function(request, response, next){

        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
        produtosBanco.lista(function(error, result){
            //response.render('produtos/lista', {lista: result});
            if(error){
                return next(error);
            }
            response.json(result);
            /*response.format({
                html: function(){
                    response.render('produtos/lista', {lista: result});
                },
                json: function(){
                    response.json(result);
                }
            });*/
        });
        connection.end();
        // produtosBanco.lista(connection, function(error, result){
        /*var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'projeto_nodejs'
        });*/
        // var connection = app.infra.createDBConnection();
        /*connection.query('SELECT * FROM livros', function(error, result){
            response.render('produtos/lista', {lista: result});
            // response.send(result);
        });*/

        //response.render('produtos');
        // response.send('<html><body><h1>Listagem de produtos</h1></body></html>');
    });

    app.post('/produtos', function(request, response, next){

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        var produto = request.body;
        // console.log(produto);

        /*var validarTitulo = request.assert('titulo', 'Titulo obrigatório.');
        validarTitulo.notEmpty();*/
        request.assert('titulo', 'Titulo obrigatório.').notEmpty();
        request.assert('preco', 'Preco Inválido.').isFloat();

        var errors = request.validationErrors();

        if(errors){
            // response.render('produtos/form', {validacaoErros: errors, produto: produto});
            response.format({
                html: function(){
                    response.status(400).render('produtos/form', {validacaoErros: errors, produto: produto});
                },
                json: function(){
                    response.status(400).json(errors);
                }
            });
            return;
        }
        produtosDAO.gravar(produto, function(error, result){
            if(error){
                return next(error);
            }
            response.redirect('/lista');
        });
        connection.end();
    });

    app.get('/produtos/:id', function(request, response, next){

        var _params = request.params.id;
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        if(connection){

            produtosDAO.buscarProduto(_params, function(err, result){
                if(err){
                    return next(err);
                }
                response.status(200).render('produtos/form', {validacaoErros:{}, produto: result[0]});
                // response.redirect(200, 'produtos/form', {validacaoErros:{}, produto: result[0]});
                return;
            });
        }else{
            console.log('Connection nula.');
            return;
        }
        connection.end();
    });

    app.get('/produtos/form', function(request, response){
        response.render('produtos/form', {validacaoErros: {}, produto: {}});
        return;
    });
    /*---*/

    app.get('/getImage/:_id', function(request, response){

        var id = request.params._id;
        console.log(id);
        response.status(200).sendFile('/home/iagofontes/Documentos/nodejs/app/views/images/'+id+'.jpg');
/*        switch(id){
            case '1':
                // response.status(200).send('https://dtqtu30aguuf7.cloudfront.net/wp-content/uploads/2016/05/BRM47GK_vitrine_m-310x283.jpg');
                response.status(200).sendFile('/home/iagofontes/Documentos/nodejs/app/views/images/sons.jpg');
                break;
            case '2':
                response.status(200).sendFile('/home/iagofontes/Documentos/nodejs/app/views/images/geladeira.jpg');
                break;
            case '3':
                response.status(200).sendFile('/home/iagofontes/Documentos/nodejs/app/views/images/microondas.jpg');
                break;
            default:
                console.log('Padrão');
                break;
        }*/
    });

    app.get('/pagseguro', function(request, response){
        response.status(200).render('produtos/pag-seguro');
    });
    app.get('/donates', function(request, response){
        // var donates = [];
        response.json({"donatezinhas" : [{"name":'Geladeira', "pathImage":'http://172.20.10.7:3000/getImage/1'},
            {"name":'MicroOndas', "pathImage":'http://172.20.10.7:3000/getImage/2'}]});
    });

    app.get('/events', function(request, response){
        // var date = new Date();
        // console.log(date.getDate());
        response.json({"eventos" : [{"data":"21/05/2017", "descricao":"Evento muito legal", "valor":19.90},
            {"data": "30/06/2017", "descricao":"Evento bacaninha.", "valor":0.0},{"data": "09/06/2017", "descricao":"Provinha Bossini.", "valor":10.0}]})
    });

    app.get('/teste', function(request, response){
        response.send('rota de GET acessada com sucesso.');
    });

    app.post('/teste', function(request, response){
        response.send('rota de POST acessada com sucesso.');
    });

    app.put('/teste', function(request, response){
        response.send('rota de PUT acessada com sucesso.');
    });

    app.delete('/teste/:id', function(request, response, next){
        var id = request.params.id;
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.removerProduto(id, function(error, result){
            if(error){
                return next(error);
            }
            if(result){

                response.json({mensagem: 'Removido com sucesso'});
                return;
            }
        });


        // response.send('rota de DELETE acessada com sucesso.');
    });

    /*---*/

    // app.delete('/produtos/:id', function(request, response){
    // app.delete('/produtos/remove/:id', function(request, response){
    app.get('/produtos/remove/:id', function(request, response, next){
        // console.log(param);
        var id = request.params.id;
        console.log(id);

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.removerProduto(id, function(err, result){

            if(err){
                return next(err);
            }

            response.redirect('/lista');
            return;
            /*if(!err){
                // response.redirect('/lista');
                return true;
            }*/
        });

        connection.end();
        return;

        // console.log(request.body);
    });



}