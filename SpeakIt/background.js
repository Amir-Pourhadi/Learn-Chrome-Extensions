chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "SpeakIt",
    title: "SpeakIt",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
  if (menuItemId === "SpeakIt" && selectionText) {
    chrome.tts.speak(selectionText, { rate: 0.7 });
  }
});
