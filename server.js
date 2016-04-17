// Server APIs
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var querystring = require('querystring');
var http = require('http');
http.post = require('http-post');
 
// email do vendedor
var email = 'cercaoc@email.com';
// token da conta do lucas
var token = '26AB322297EB4C039870429CA2B2FC4F';
var URL_PAG = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=';
 
app.get('/', function (req, res) {
	//Load the request module
	var request = require('request');

	//Lets configure and request
	request({
		url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout/', //URL to hit
		qs: {
      'email' : 'cercaoc@gmail.com',
      'token': '26AB322297EB4C039870429CA2B2FC4F',
      'currency': 'BRL',
      'warning_level' : 'QUIET',
	  'itemId1' : '0001',
	  'itemDescription1' : 'Notebook Prata',
	  'itemAmount1' : '24300.00',
	  'itemQuantity1' : '1',
	  'itemWeight1' : '1000',
	  'reference' : 'REF1234',
	  'senderName' : 'Jose Comprador',
	  'senderAreaCode' : '11',
	  'senderPhone' : '56273440',
	  'senderEmail' : 'comprador@uol.com.br',
	  'shippingType' : '1',
	  'shippingAddressStreet' : 'Av. Brig. Faria Lima',
	  'shippingAddressNumber' : '1384',
	  'shippingAddressComplement' : '5o andar',
	  'shippingAddressDistrict' : 'Jardim Paulistano',
	  'shippingAddressPostalCode' : '01452002',
	  'shippingAddressCity' : 'Sao Paulo',
	  'shippingAddressState' : 'SP',
	  'shippingAddressCountry' : 'BRA'	       
  }, //Query string data
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1'			
		}
		//body: 'Hello Hello! String body!' //Set the body as a string
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			console.log(response.statusCode, body);
			var parseString = require('xml2js').parseString;

			parseString(body, function (err, result) {
				res.writeHead(301,
					{Location: URL_PAG + result.checkout.code}
				);
				res.end();
				
				
				console.dir(result);
			});
		}
	});
});
 
app.listen(3000, function () {
  console.log('Example app listening on port:' + port);
});