var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var validator = require('validator');
var userrouter=express.Router();
var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"123",
	database:"traveldb"
});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieparser());
var js={"message":"invalid user"}

userrouter.post('/verify',function (request, response){
	//var id1=request.body.eid;
	var tok=request.body.token;
	var id=request.body.id;
	var role=request.body.role1;
	var decoded = jwt.verify(tok, 'osheen');
	console.log(decoded);
	if(id==decoded.userid && role==decoded.role){
		js.message="valid user";
	}
	else{
		js.message="invalid user";
	}
	console.log(js);
	response.send(js);

});

module.exports = userrouter;