
		function abcd(){
		var httpObj=new	XMLHttpRequest();
		httpObj.onreadystatechange=function(){
			console.log(this.readyState);
			document.getElementById("result").innerHTML=this.status;
			if(this.readyState=='4')
			{
				var res=this.responseText;
				result=JSON.parse(res);
					if(result.status==200)
					
					{
						
						console.log(result.message);
						//document.getElementById("result").innerHTML=result.message;
						
					}
					else{
						console.log(result.message);
						//document.getElementById("result").innerHTML=result.message;
					}
			}
		};
		httpObj.open('POST','http://127.0.0.1:8081',true);
		httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
		httpObj.send('eid='+document.getElementById('username').value+'&password='+document.getElementById('password').value);
		}