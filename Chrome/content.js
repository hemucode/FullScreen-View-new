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


