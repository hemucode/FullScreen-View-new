// chrome.action.onClicked.addListener(tab => {
//     console.log(`[FullScreen for Chrome v${chrome.runtime.getManifest().version}]`);
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       var activeTab = tabs[0];
//             chrome.scripting.executeScript({
//                 target: { tabId: activeTab.id },
//                 files: [`content-script.js`],
//             });
//             chrome.scripting.insertCSS({
//                 target: { tabId: activeTab.id },
//                 files: [`content-style.css`],
//             });
//     });
// });
// `${request.rule}.css`
// if(domains.contains(request.url)){
//     chrome.action.setPopup({
//         popup: "data/interface/index.html"
//     });
// }
//else{
//     chrome.browserAction.setPopup({
//         popup: "nottracking.html"
//     });
//}
chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {
    case "INSERT_JS": {
      chrome.action.setPopup({
        popup: "data/interface/index.html"
      });
    }
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


