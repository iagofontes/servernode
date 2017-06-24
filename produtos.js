var http = require('http');

var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><body>Minha página com server nodejs</body></html>')
});

server.listen(3000);

console.log('listagem de produtos');
