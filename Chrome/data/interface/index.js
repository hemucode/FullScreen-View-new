domReady(() => {
   fullScreen()
})

function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

function translateHTML (dataKey = 'message') {
  for (const $element of document.getElementsByTagName('*')) {
    if ($element.dataset && $element.dataset[dataKey]) {
      $element.innerText = chrome.i18n.getMessage($element.dataset[dataKey])
    }
  }
}


function fullScreen(){
    document.querySelector("#range").addEventListener("change" , (event) =>{
    return chrome.runtime.sendMessage({
        action: "INSERT_ZOOM",
        rule: document.querySelector("#range").value,
        });
    });
    document.querySelector(".fullscreen").addEventListener("click" , (event) =>{
    return chrome.runtime.sendMessage({
        action: "INSERT_FULL"
        });
    });
}
