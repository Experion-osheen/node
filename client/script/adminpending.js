var httpObj=new XMLHttpRequest();
httpObj.onreadystatechange=function()
{
    console.log(this.readyState);
    //document.getElementById("result").innerHTML=this.status;
    if(this.readyState=='4' && this.status=='200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
            console.log(result[0]);
            content = "<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>EmpID</th><th>Cause</th><th>Source</th><th>Destination</th><th>Mode</th><th>FromDate</th><th>Todate</th><th>No:days</th><th>Priority</th><th>Status</th><th>ProjectId</th><th>Action</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            content += "<tr><td>" + element.empid + "</td><td>" + element.cause + "</td><td>" + element.source + "</td><td>" + element.destination + "</td><td>" + element.mode + "</td><td>" + element.fromdate + "</td><td>" + element.todate + "</td><td>" + element.no_days + "</td><td>" + element.priority + "</td><td>" + element.status + "</td><td>" + element.projectname + "</td><td> <select class='gp' id="+element.tid+" onChange=action1(this.selectedIndex,"+element.tid+")><option value='select'>Select</option><option value='approved'>Approved</option><option value='rejected'>Rejected</option><option value='onhold'>Onhold</option></select></td></tr>";
            i++;
        });
        content += "</tbody> </table> </div>";  
                document.getElementById('tablecontent').innerHTML = content;
    }
};
httpObj.open('GET','http://192.168.1.226:8081/admin/pending',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();

function action1(value,tid){
    if(value==0) status="not done";
    else if(value==1) status="approved";
    else if(value==2) status="rejected";
    else if(value==3) status="pending";
    console.log(status);
    var httpObj1=new XMLHttpRequest();
    httpObj1.onreadystatechange=function(){
        if(this.readyState=='4' && this.status=='200'){
            var result=this.responseText;
            window.alert("Update Successfully");
            console.log(result);
            window.location.reload();
        }
    };
    httpObj1.open('PUT','http://192.168.1.226:8081/status',true);
    httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
    httpObj1.send("tid11="+tid+"&status="+status);
}
