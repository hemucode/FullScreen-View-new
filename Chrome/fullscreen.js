if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) 
    || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) 
    || (document.mozFullScreen !== undefined && !document.mozFullScreen) 
    || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
var el = document.documentElement, rfs =  
       el.requestFullScreen
    || el.webkitRequestFullScreen
    || el.mozRequestFullScreen
    || el.msRequestFullScreen
;
if(typeof rfs!="undefined" && rfs){
  rfs.call(el);
} else if(typeof window.ActiveXObject!="undefined"){
  var wscript = new ActiveXObject("WScript.Shell");
  if (wscript!=null) {
     wscript.SendKeys("{F11}");
  }
}
}else{
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
