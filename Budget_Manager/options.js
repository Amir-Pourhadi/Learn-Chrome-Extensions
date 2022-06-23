const formEl = document.querySelector("form");
const limitInput = document.querySelector("input#limit");

chrome.storage.sync.get("limit", ({ limit }) => {
  limitInput.value = limit || 0;
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  if (limitInput.value) chrome.storage.sync.set({ limit: +limitInput.value });
  close();
});

formEl.addEventListener("reset", (event) => {
  event.preventDefault();
  chrome.storage.sync.set({ total: 0 });
  close();
});
