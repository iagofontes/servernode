var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var rotas = require('./app/routes/route')(app);

app.set('io', io);

// app.listen(3000, function(){
http.listen(3000, function(){
    console.log('server rodando');
});