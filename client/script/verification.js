function verify1(clue){
	var jwttoken=localStorage.getItem('token1');
	var id=sessionStorage.getItem('eid');
	var role1=localStorage.getItem('rolestore');
	console.log(jwttoken);
	var httpObj=new	XMLHttpRequest();
	httpObj.onreadystatechange=function(){
		if(this.readyState=='4' && this.status=='200'){
			var result=this.responseText;
			result=JSON.parse(result);
			if((clue==1&&role1=="user")||(clue=0&&role1=="admin")||(result.message=="invalid user")){
				sessionStorage.removeItem('eid');
				sessionStorage.removeItem('tid');
				localStorage.clear();
				window.location = "index.html";
			}

		}
	};

	httpObj.open('POST','http://192.168.1.226:8081/verify',true);
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send('token='+jwttoken+'&id='+id+'&role1='+role1);
}