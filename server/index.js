const Express = require('express');
const Request = require('request');
const BodyParser = require('body-parser');

const API_URL = "http://yourmoneyisnowmymoney.com/api/zipcodes/?zipcode=";

var App = Express();

// Middlewares
App.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
App.use(BodyParser.urlencoded({ extended: true }));

App.get("/:zipcode", function(req, res) {
	Request.get(API_URL + req.params.zipcode, function (error, response, body) {
		res.send(JSON.parse(body));
	});
});

App.listen(3000, function(){
	console.log("Listening at port 3000");
});
