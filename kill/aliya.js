<!DOCTYPE html>
<html>
<head>
<title>Sample Page</title>
</head>
<body>
<center>
<input type="text" id="username" placeholder="enter eid">
<input type="password" id="password" placeholder="enter password">
 <button type="button" onclick="abcd();">Click me</button> </p>
 <div id="result"></div>
</center>
<script>
function abcd(){
var httpObj=new	XMLHttpRequest();
httpObj.onreadystatechange=function()
{
	console.log(this.readyState);
	document.getElementById("result").innerHTML=this.status;
	if(this.readyState=='4' && this.status=='200')
	{
		var result=this.responseText;
		result=JSON.parse(result);
				if(result.message==200)
			
			{
				
				console.log(result.message);
				document.getElementById("result").innerHTML=result.message;
				
			}
			else{
				console.log(result.message);
				document.getElementById("result").innerHTML="result";
			}
	}
}
httpObj.open('POST','http://127.0.0.1:8081',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send('eid='+document.getElementById('username').value+'&password='+document.getElementById('password').value);
}
</script>
</body>
</html>
