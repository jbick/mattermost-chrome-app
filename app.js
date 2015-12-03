// thanks to http://tipstak.blogspot.de/2014/05/how-to-manipulate-dom-of-webview-on-chrome-apps.html
var wvv = document.getElementById("chatwebview");
  wvv.addEventListener('contentload', function() {
    execScripts(wvv);
    // postMessage to webview
    console.log("Requesting title...");
    window.setInterval(function(){
      wvv.contentWindow.postMessage({
        command: 'getTitle'
      }, '*');
    }, 1000);
  });

  function execScripts(wvv) {
    console.log("execScripts");
    // change css styles if needed
    /*wvv.insertCSS({
      code: "body { background-color: black; }"
    });*/
    // execute script
    wvv.executeScript({
      code:
          "window.addEventListener('message', function(e){"
        + "  console.log('Received command:', e.data.command);"
        + "  if(e.data.command == 'getTitle'){"
        + "    console.log('Sending title...');"
        + "    e.source.postMessage({ title: document.title }, e.origin);"
        + "  }"
        + "});"
    });
  }
