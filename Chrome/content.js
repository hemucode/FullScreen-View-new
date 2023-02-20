console.log(`[The Lights Off v${chrome.runtime.getManifest().version}]`);
/**
 * @returns Promise
 */
function inject() {
  return chrome.runtime.sendMessage({
    action: "INSERT_JS"
  });
}inject();
