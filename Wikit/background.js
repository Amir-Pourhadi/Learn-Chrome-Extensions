chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "wikIt",
    title: "wikIt",
    contexts: ["selection"],
  });
});

function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

chrome.contextMenus.onClicked.addListener(async ({ menuItemId, selectionText }) => {
  if (menuItemId === "wikIt" && selectionText) {
    const wikiUrl = `https://en.wikipedia.org/wiki/${fixedEncodeURI(selectionText)}`;
    const currentWindow = await chrome.windows.getCurrent();
    chrome.windows.create({
      url: wikiUrl,
      type: "popup",
      top: 100,
      left: 50,
      width: currentWindow.width / 2,
      height: currentWindow.height / 2,
    });
  }
});
