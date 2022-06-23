const formEl = document.querySelector("form");
const limitInput = document.querySelector("input#limit");

chrome.storage.sync.get("limit", ({ limit }) => {
  limitInput.value = limit || 0;
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  if (limitInput.value) chrome.storage.sync.set({ limit: +limitInput.value });
  chrome.notifications.create("limitNotify", {
    type: "basic",
    iconUrl: "icon48.png",
    title: "Budget Manager",
    message: `New limit has been set to $${limitInput.value} successfully!`,
  });
});

formEl.addEventListener("reset", (event) => {
  event.preventDefault();
  chrome.storage.sync.set({ total: 0 }, () => {
    chrome.notifications.create("resetNotify", {
      type: "basic",
      iconUrl: "icon48.png",
      title: "Budget Manager",
      message: "Total has been reset successfully!",
    });
  });
});
