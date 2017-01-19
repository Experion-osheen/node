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
var adminjs={"status":'403',"message":"Update Failed","action":"nothing"};


userrouter.get('/admin/pending',function (request, response){
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and ( request.status='pending' or request.status='not done')",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});


userrouter.put('/status',function (request, response){
	var ted=request.body.tid11;
	var stat=request.body.status;

	console.log(ted,stat);
	connection.query("UPDATE request SET status=? where tid= ?" , [stat, ted], function (err,result) {
		if(!err){
			adminjs.message="Updated Successfully";
			adminjs.status='200';
			adminjs.action=stat;
		}
		response.send(adminjs);
	});
});

module.exports = userrouter;
