var express=require("express");
var ex=express();
var fs = require("fs");
var _=require("lodash");
var app=express.Router();
var bp=require("body-parser");
ex.use(bp.urlencoded({extended:true}));
ex.use(bp.json());
app.route('/view') 
 .get(function(request, response) {
  
  response.contentType('application/json');
  fs.readFile("file.json",'utf8',function(err,data){
  	if(err){
  	 return console.log("error");
  	}
  	else {
  		var people=JSON.parse(data);
  		console.log(people);
  		response.send(people);
  	}
  });
});

 app.route('/view/:username')
  .get(function(request,response){
  	response.contentType('application/json');
  	fs.readFile("file.json","utf8",function(err,data){
  		if(err)
  			return console.log("error");
  		else{

  			var people=JSON.parse(data);
  			response.send(_.find(people,{"name":request.params.username}));
  		}
  	});
  });
 app.route('/delete/:username')
 	.delete(function(request,response){
 		response.contentType('application/json');
 		fs.readFile("file.json","utf8",function(err,data){
 			if(err)
 				return console.log("error");
 			else{
 				var people=JSON.parse(data);
 				_.remove(people,{"name":request.params.username});
 				people=JSON.stringify(people);
 				fs.writeFile('file.json',people,function(err){
  				if(err){
  					console.log("error");
  				}
  				else{
  					console.log(people);
  					response.send(people);
  				}
  			});
 				

 			}
 		});

 	});

app.route('/put/:username/:age')
  .put(function(request, response) {
  
  response.contentType('application/json');
  fs.readFile("file.json",'utf8',function(err,data){
  	if(err){
  	 return console.log("error");
  	}
  	else {
  		data=JSON.parse(data);
        people=data.filter(function(item){

          if(item.name==request.params.username){
            item.age=request.params.age;

          }
          return item;
  		});
  		people=JSON.stringify(people);
		fs.writeFile('file.json',people,function(err){
			if(err){
				console.log("error");
			}
			else{
				console.log(people);
				response.send(people);
			}
		});
	}	
  });
});

app.route('/post')
	.post(function(request, response) {
  		response.contentType('application/json');
  		fs.readFile('file.json','utf8',function (err,data){
  	      if (err) {
          return console.log("error");
        	}
        	else{
		            var content=request.body;
		            var person=JSON.parse(data);
		            console.log(person);
		            person.push(content);
		            person=JSON.stringify(person);
		            console.log(person);
             		fs.writeFile("file.json", person, function(err) {
		            if(err) {
		            return console.log(err);
		            }
		            else{
		          		response.send(person);
		                console.log("New entry made");
		            }
        			});
    
        		}
 		 });
	});
ex.use('/',app);
ex.listen(8081,function(){
	console.log("Started");
});