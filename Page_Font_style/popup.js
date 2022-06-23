const colorInput = document.querySelector("input[type=color]");

chrome.storage.sync.get("color", ({ color }) => {
  if (color) colorInput.value = color;
});

colorInput.addEventListener("change", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { task: "changeColor", color: colorInput.value });
    chrome.storage.sync.set({ color: colorInput.value });
    close();
  });
});
