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



userrouter.get('/admin',function (request, response){
	
	console.log(request,response);
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.get('/admin/approved',function (request, response){
	console.log("hai");
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and request.status='approved'",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.get('/admin/rejected',function (request, response){
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and request.status='rejected'",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

module.exports = userrouter;
