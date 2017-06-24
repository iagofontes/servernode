var app = require('./config/express')();
// var rotas = require('./app/routes/route')(app);

app.listen(3000, function(){
    console.log('server rodando');
});