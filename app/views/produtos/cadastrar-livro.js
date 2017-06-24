var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(request){
    request.on('data', function(body){
        console.log('Corpo:'+body);
    });
});

var produto = {
    titulo: 'Livro dahora',
    // titulo: '',
    preco: '19.9',
    preco: '',
    descricao: 'Livro dahora pra hoje'
};

client.end(JSON.stringify(produto));