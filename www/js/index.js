var app = {};
$.getScript("js/creator.js");
$.getScript("js/areas.js");
$.getScript("js/setter.js");
document.addEventListener("deviceready", function(){
AndroidFullScreen.immersiveMode();
AndroidFullScreen.setSystemUiVisibility();
AndroidFullScreen.showUnderSystemUI();
}, false);