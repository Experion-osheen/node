function logout1(){
	sessionStorage.removeItem('eid');
	sessionStorage.removeItem('tid');
	localStorage.clear();
	window.location="index.html";
	return false;
}
