var msgCount = 0;
var pattern = /\((\d+)\)/;
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    bounds: {
      width: 800,
      height: 800
    }
  }, function(w){
    w.contentWindow.addEventListener('load', function(){
      console.log("Window loaded");
      var wv = w.contentWindow.document.getElementById("chatwebview");
      wv.addEventListener('contentload', function() {
        console.log("Webview loaded");
      });

    // onMessage from webview
    w.contentWindow.addEventListener('message', function(e){
      if(e.data.title.substring(0,1)!=="("){
        newMsgCount = 0;
      }
      else{
        match = e.data.title.match(pattern);
        if(match[1]){
          newMsgCount = parseInt(match[1]);
        }
      }
      if(newMsgCount>msgCount){
        w.drawAttention();
      }
      msgCount = newMsgCount;
    });

    });
  });
});
