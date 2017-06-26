var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var method_override = require('method-override');


module.exports = function(){

    var app = express();
    var fs = require('fs');

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(method_override('_method'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());
    // app.use(fs);

    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);
    // load('routes').into(app);

    app.use(function(req, resp, next){
        resp.status(404).render('errors/404');
        next();
    });

    app.use(function(error, req, resp, next){
        if(process.env.NODE_ENV == 'production'){
            resp.status(500).render('errors/500');
        }
        next(error);
    });

    return app;
}