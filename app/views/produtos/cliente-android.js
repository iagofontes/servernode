var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    headers:{
        'Accept': 'application/json'
    }
};

http.get(configuracoes, function(request, respose){
    
    request.on('data', function(body){
        console.log('Corpo:'+body);
    });
});