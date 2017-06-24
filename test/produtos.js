// var http = require('http');
// var assert = require('assert');
var express = require('../config/express')();
var request = require('supertest')(express);
describe('#ProdutosController', function(){

    /*beforeEach(function(request, response, done, next){
        var conn = express.infra.connectionFactory;
        conn.query("DELETE FROM livros", function(ex, result){
            if(!ex){
                done();
            }else{
                return next(ex);
            }
        });
    });*/

    it('#listagem json', function(done){
        request.get('/')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done);
    });

    it('#Cadastro de produtos com dados inválidos', function(done){
        request.post('/produtos')
            .send({titulo:'', preco:15.4, descricao: 'total'})
            .expect(400, done);
    });

    it('#Cadastro de produtos com dados válidos', function(done){
        request.post('/produtos')
            .send({titulo: 'new book', preco: 9.99, descricao: 'Muito bom e barato'})
            .expect(302, done);
    });

        // console.log("Teste de verificação de listagem em json.");
        /*var configuracoes = {
            hostname: 'localhost',
            port: 3000,
            path: '/',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };
        http.get(configuracoes, function(response){
            
            // console.log(response);

            assert.equal(response.statusCode, 200);
            assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');

            /*if(response.statusCode == 200){
                console.log('Status code ok');
            }
            if(response.headers['content-type'] == 'application/json; charset=utf-8'){
                console.log('Content-Type ok');
            }*/
          //  done();
        //});    
});