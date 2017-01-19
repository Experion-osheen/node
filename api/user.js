var express = require('express');
var bodyParser = require('body-parser');
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

userrouter.get('/user/:userid',function (request, response){
	var id1=request.params.userid;
	console.log("uid from client:"+id1);

	connection.query("select cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and request.empid=?",[id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    console.log(json);
    response.send(json);
	});
});
userrouter.get('/user/:userid/:status',function (request, response){
	var id1=request.params.userid;
	var status=request.params.status;
	connection.query("select empid,tid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and status=? and request.empid=?",[status,id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});


module.exports = userrouter;
