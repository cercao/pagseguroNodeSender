// Server APIs
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
 
// email do vendedor
var email = 'cercaoc@email.com';
// token da conta do lucas
var token = '26AB322297EB4C039870429CA2B2FC4F';
 


 
app.get('/', function (req, res) {
  //Inicializar a função com o e-mail e token 
    var pag, pagseguro;
    pagseguro = require('pagseguro');
    pag = new pagseguro({
        email : 'cercaoc@email.com',
        token: '26AB322297EB4C039870429CA2B2FC4F',
		mode : 'sandbox'
    });
 
    //Configurando a moeda e a referência do pedido 
    pag.currency('BRL');
    pag.reference('12345');
 
    //Adicionando itens 
    pag.addItem({
        id: 1,
        description: '8Hs RTG Pro Server',
        amount: "14.99",
        quantity: 3,
        weight: 2342
    });
 

    //Configurando as informações do comprador 
    pag.buyer({
        name: 'Lucas Rodrigues',
        email: 'c68993417956129600108@sandbox.pagseguro.com.br',
        phoneAreaCode: '11',
        phoneNumber: '953630279'
    });
 
    //Configurando a entrega do pedido 

    pag.shipping({
        type: 1,
        street: 'Rua Joao Martins Ribeiro Filho',
        number: '114',
        complement: 'Apto 44',
        district: 'Jardim Adhemar de Barros',
        postalCode: '05540040',
        city: 'São Paulo',
        state: 'RS',
        country: 'BRA'
    });
 
    //Configuranto URLs de retorno e de notificação (Opcional) 
    //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica 
    pag.setRedirectURL("http://ec2-54-233-172-47.sa-east-1.compute.amazonaws.com/pagseguro");
    pag.setNotificationURL("http://ec2-54-233-172-47.sa-east-1.compute.amazonaws.com/pagseguro");
 
    //Enviando o xml ao pagseguro 
    pag.send(function(err, res) {
        if (err) {
            console.log(err);
			//res.send(err);	
        }
        console.log(res);
    });
});
 
app.listen(3000, function () {
  console.log('Example app listening on port:' + port);
});