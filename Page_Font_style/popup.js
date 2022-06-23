const colorInput = document.querySelector("input[type=color]");

colorInput.addEventListener("change", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { task: "changeColor", color: colorInput.value });
    close();
  });
});
