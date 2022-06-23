chrome.action.disable();

chrome.runtime.onMessage.addListener(({ todo }) => {
  if (todo === "ShowAction")
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.action.show(tabs[0].id);
    });
});
