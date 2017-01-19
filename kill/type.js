var express=require("express");
var ex=express();
var cors = require('cors');
var db=require("mysql");
var bp=require("body-parser");
var login=express.Router();
ex.use(cors);
var connection=db.createConnection(
{
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'nodedb'
});
ex.use(bp.urlencoded({extended:true}));
ex.use(bp.json());
connection.connect();
var msg;

login.route('/')
	.post(function(request,response){
	var username=req.body.eid;
	var password=req.body.password;
	console.log(username,password);
	connection.query('select * from login',function(err,rows,fields){
	if(!err){
		var js={"status":"","message":""};
		console.log(js);
		var data=JSON.stringify(rows);
	var json=JSON.parse(data);
		for(var i=0;i<rows.length;i++){
			console.log(rows[i]);
			if(rows[i].username==username && rows[i].password==password){
				js.status=200;
				js.message="success";
				response.send(js);
		
			} 
		}
		if(i<rows.length){
				js.status=400;
				js.message="failure";
				response.send(js);
		
		}
	}
		
	});
});
ex.use('/',login);	
ex.listen(8081,function(){
	console.log("Started");
	});
