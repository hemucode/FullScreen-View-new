//================================================
/*
MIT License

Fullscreen, #1 Zoom and Dark Mode more options will get in one
Copyright (C) 2023 hemanta gayen
www.downloadhub.cloud

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
//================================================

domReady(() => {
   translateTITLE()
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

function translateTITLE (dataKey = 'message') {
  for (const $element of document.getElementsByTagName('*')) {
    if ($element.dataset && $element.dataset[dataKey]) {
      $element.title = chrome.i18n.getMessage($element.dataset[dataKey])
    }
  }
}

/**
 * @returns Codehemu
 */

async function ZoomFun(){
  document.addEventListener("contextmenu", function (e){
    e.preventDefault();
   }, false);

  var a = new Promise(function(resolve, reject){
      chrome.storage.sync.get({"zoom": "100"}, function(options){
          resolve(options.zoom);
      })
  });

  const zoom = await a;
  console.log(zoom);
  const $range = document.querySelector("#range");
  const $zoomvalue = document.querySelector("#zoomvalue");
  const $reset = document.querySelector(".reset");
  const $fullscreen = document.querySelector(".fullscreen");
  const $source = document.querySelector(".source");
  const $tab = document.querySelector(".tab");
  const $print = document.querySelector(".print");
  const $mode = document.querySelector(".mode");

  $range.value = zoom;
  $zoomvalue.innerText = zoom+"%";
  
  $range.addEventListener("input" , (event) =>{
    $zoomvalue.innerText = $range.value+"%";
  });

  $range.addEventListener("change", (event) =>{
      const zoom = $range.value;
      chrome.storage.sync.set({ zoom });
  })
  $zoomvalue.addEventListener("click" , (event) =>{
    const zoom = 100;
    $range.value = zoom;
    $zoomvalue.innerText = zoom+"%";
    chrome.storage.sync.set({ zoom });
  })
  $reset.addEventListener("click" , (event) =>{
    const zoom = 100;
    $range.value = zoom;
    $zoomvalue.innerText = zoom+"%";
    chrome.storage.sync.set({ zoom });
  })
  $fullscreen.addEventListener("click" , (event) =>{fullscreen();});
  $source.addEventListener("click" , (event) =>{source();});
  $tab.addEventListener("click" , (event) =>{tab();});
  $print.addEventListener("click" , (event) =>{print();});
  $mode.addEventListener("click" , (event) =>{mode();});

}
/**
 * @returns Codehemu
 */
function fullscreen(){
  return chrome.runtime.sendMessage({
    action: "INSERT_FULL"
    });
}
/**
 * @returns Codehemu
 */
function source(){
  return chrome.runtime.sendMessage({
    action: "INSERT_SOURSE"
    });
}
/**
 * @returns Codehemu
 */
function tab(){
  return chrome.runtime.sendMessage({
    action: "INSERT_TAB"
    });
}
/**
 * @returns Codehemu
 */
function print(){
  return chrome.runtime.sendMessage({
    action: "INSERT_PRINT"
    });
}
/**
 * @returns Codehemu
 */
function mode(){
  return chrome.runtime.sendMessage({
    action: "INSERT_MODE"
    });
}


