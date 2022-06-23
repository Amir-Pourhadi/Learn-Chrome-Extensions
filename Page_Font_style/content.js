chrome.runtime.onMessage.addListener(({ task, color }) => {
  if (task === "changeColor") {
    document.querySelector("article").style.color = color;
  }
});
