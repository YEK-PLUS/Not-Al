var app = {};
$.getScript("js/creator.js");
$.getScript("js/areas.js");
$.getScript("js/setter.js");
document.addEventListener("deviceready", function(){
	Resizer();
}, false);