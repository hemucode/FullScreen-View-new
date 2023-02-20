domReady(() => {
   ZoomFun()
})

/**
 * @returns Codehemu
 */


function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

/**
 * @returns Codehemu
 */

async function ZoomFun(){
  var a = new Promise(function(resolve, reject){
      chrome.storage.sync.get({"zoom": "100"}, function(options){
          resolve(options.zoom);
      })
  });
  const zooms = await a;
  if (zooms && document.body.style){
    document.body.style.zoom = zooms+"%";
  }

}

/**
 * @returns Codehemu
 */

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace !== "sync") return;
  if (changes.zoom) {
    if (changes.zoom.newValue) {
      ZoomFun();
    }
  }
});


