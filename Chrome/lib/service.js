chrome.tabs.onUpdated.addListener(function () {getTab();})
// Fires when the active tab in a window changes.
chrome.tabs.onActivated.addListener(function () {getTab();})
async function getTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    if (tab.url?.startsWith("chrome://") || tab.url?.startsWith("file://")){
        chrome.action.setPopup({
          popup: ""
        });
      chrome.action.setIcon({
          path: {
            32: "data/icons/icon-32-d.png",
            38: "data/icons/icon-38-d.png",
            128: "data/icons/icon-128-d.png"
          }
      });
    }else{

        chrome.action.setPopup({
          popup: "data/interface/index.html"
        });

        chrome.action.setIcon({
          path: {
            32: "data/icons/icon-32.png",
            38: "data/icons/icon-38.png",
            128: "data/icons/icon-128.png"
          }
        });
    }
  })
}

chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {   
    case "INSERT_FULL": {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
          chrome.scripting.executeScript({
              target: { tabId: activeTab.id },
              function: fullScreen,
          }); 
      });
    }
  }
});
chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {   
    case "INSERT_MODE": {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
          chrome.scripting.executeScript({
              target: { tabId: activeTab.id },
              function: mode,
          }); 
      });
    } 
  }
});

chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {   
    case "INSERT_PRINT": {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
          chrome.scripting.executeScript({
              target: { tabId: activeTab.id },
              function: print,
          }); 
      });
    } 
  }
});
chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {   
    case "INSERT_SOURSE": {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
        chrome.tabs.create({url:"view-source:" + activeTab.url})    
      });
    }
  }
});

chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {   
    case "INSERT_TAB": {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
        chrome.tabs.create({url: activeTab.url})    
      });
    }
  }
});



function mode(){
  body = document.body;
  head = document.head;
  var the_light_off_style = document.querySelector(".the_light_off_style");
  var the_light_off = `<the-light-off><div class="the_light_off"></div></the-light-off>` 
  var the_light_off_element = document.querySelector("the-light-off");

  if (body) {
    if (the_light_off_element) {
      the_light_off_element.parentNode.removeChild(the_light_off_element);
    }else{
      body.insertAdjacentHTML('beforeEnd',the_light_off);
    }
  }
  if (head) {
    if(the_light_off_style){
      the_light_off_style.parentNode.removeChild(the_light_off_style);
    }else{
        var css = document.createElement("style");
        css.classList.add("the_light_off_style")
        head.appendChild(css);
        css.type = 'text/css';
        css.innerText =`the-light-off{ display: block; transition: none 0s ease 0s; margin: 0px; padding: 0px; border-radius: 0px; border: none; outline: none; visibility: visible; max-height: none; max-width: none; clip: unset; overflow: visible; opacity: 1; pointer-events: none !important; z-index: auto !important; } .the_light_off { display: block; transition: none 0s ease 0s; margin: 0px; padding: 0px; border-radius: 0px; border: none; outline: none; visibility: visible; max-height: none; max-width: none; clip: unset; overflow: visible; opacity: 0.8; position: fixed; inset: -10%; width: auto; height: auto; z-index: 2147483645; background: rgb(0, 0, 0); mix-blend-mode: multiply; } html5-video-player, .html5-video-player{ z-index: 21474836456 !important; outline: none; } yt-image img:hover{ position: absolute; z-index: 21474836456 !important; }`

    }

  }
}
function fullScreen(){
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
}

function print(){window.print()}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "1",
      title: "\u2665 Rate Me \u2026",
      contexts: ["action"]
    });

    chrome.contextMenus.create({
      id: "2",
      title: "\u266b What's New \u2026",
      contexts: ["action"]
    });

    chrome.contextMenus.create({
      id: "3",
      title: "\u2615\ufe0e Donate \u2026",
      contexts: ["action"]
    });

    chrome.contextMenus.create({
      id: "4",
      title: "\u260e Feedback \u2026",
      contexts: ["action"]
    });
});
async function contextClick(info, tab) {
  const { menuItemId } = info

  if (menuItemId == '1') {
    chrome.tabs.create({url:`https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`})
  }
  if (menuItemId == '2') {
    chrome.tabs.create({url:`https://www.downloadhub.cloud/2022/12/ad-blocker.html`})
  }
  if (menuItemId == '3') {
    chrome.tabs.create({url:`https://www.downloadhub.cloud/2023/01/lights.html?reason=support`})
  }
  if (menuItemId == '4') {
    chrome.tabs.create({url:`https://www.downloadhub.cloud/2023/01/lights.html#report`})
  }
}

chrome.contextMenus.onClicked.addListener(contextClick);


