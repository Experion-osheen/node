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
var jsinsert={"status":'403',"message":"insertion failed"};

function check(check){
  if ((check.search(regexp) == -1)||(check.length>50)){
  	console.log(check); 
    return true;
  }
  
  return false;
}

function check2(check){
  if (check.search(reg) == -1){ 
  	console.log(check);   
    return true;
  }
  
  return false;
}

function check3(check){
  if (check.search(date1) == -1){ 
   return true;
  }
  
  return false;
}

var reg = /^\d+$/;
var regexp = /^[a-zA-Z0-9-_. ]+$/;
var date1 = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

userrouter.put('/Request',function (request, response){
	var tid1=request.body.tid;
	var eid=request.body.empid;
	var pname=request.body.proname;
	var cse=request.body.cause;
	var src=request.body.source;
	var dst=request.body.destination;
	var fd1=request.body.fromdate;
	var fd2=new Date(fd1);
	var td1=request.body.todate;
	var td2=new Date(td1);
	var num=request.body.no;
	var mo=request.body.mode;
	var prio=request.body.priority;
	//var check = validator.isString({regex: /[0-9A-Fa-f]+/, message: 'Invalid value. Value must be hex.'});
	if (validator.isEmpty(eid)||validator.isEmpty(pname)||validator.isEmpty(cse)||validator.isEmpty(src)||validator.isEmpty(dst)||validator.isEmpty(fd1)||validator.isEmpty(td1)||validator.isEmpty(num)||validator.isEmpty(prio)){
		jsinsert.message="empty fields in server side";
	}
	else if(check(cse)){
		jsinsert.message="Invalid fields in server side cause";
	}
	else if(check2(pname)){
		jsinsert.message="Invalid fields in server side pid";
	}
	else if(check3(td1)){
		jsinsert.message="Invalid fields in server side td";
	}
	else if(check3(fd1)){
		jsinsert.message="Invalid fields in server side fd";
	}
	else if(check2(tid1)){
		jsinsert.message="Invalid fields in server side tid";
	}
	else if(check(src)){
		jsinsert.message="Invalid fields in server side src";
	}
	else if(check(dst)){
		jsinsert.message="Invalid fields in server side dst";
	}
	else if(check2(num)){
		jsinsert.message="Invalid fields in server side num";
	}
	else if(check(mo)){
		jsinsert.message="Invalid fields in server side mo";
	}
	else if(check(prio)){
		jsinsert.message="Invalid fields in server side prio";
	}
	// else if(check(cse)){
	// 	jsinsert.message="check";
	// }
	// else if(validator.isString(cse)){
	// 	jsinsert.message=
	// }
	else
		{
		 var post1 = {empid:eid,cause:cse,source:src,destination:dst,mode:mo,fromdate:fd2,todate:td2,no_days:num,priority:prio,status:"pending",projectid:pname };
		 var abc="UPDATE request SET "+post1+" where tid= "+tid1;
		 console.log(post1);
		 connection.query("UPDATE request SET ? where tid= ?" , [post1, tid1], function (err,result) {
		 	if (err) {
                jsinsert.message="failure";
                //response.send(jsinsert);
            }
            else {
                jsinsert.status='200';
                jsinsert.message="success";
                console.log(jsinsert);
                //response.send(jsinsert);
            }
         });
		
		}
	 response.send(jsinsert);
});

userrouter.get('/Request/:tid',function (request, response){
	var tid=request.params.tid;
	console.log(tid);
	var conn;
	conn = connection.query("select empid,tid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(MONTH FROM fromdate),'/',EXTRACT(DAY FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(MONTH FROM todate),'/',EXTRACT(DAY FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and request.tid=?",[tid],function(err,rows){
		var data=JSON.stringify(rows);
	    var json=JSON.parse(data);
	    console.log(json);
	    response.send(json);
	});
	
	
});

module.exports = userrouter;
