const totalSpan = document.querySelector("span#total");
const limitSpan = document.querySelector("span#limit");
const amountInput = document.querySelector("input#amount");
const formEl = document.querySelector("form");

chrome.storage.sync.get(["total", "limit"], ({ total, limit }) => {
  totalSpan.innerText = total || 0;
  limitSpan.innerText = limit || 0;
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  chrome.storage.sync.get(["total", "limit"], ({ total, limit }) => {
    let newTotal = 0;
    if (total) newTotal += +total;
    if (amountInput.value) newTotal += +amountInput.value;

    chrome.storage.sync.set({ total: newTotal }, () => {
      if (amount && newTotal >= limit)
        chrome.notifications.create("limitNotify", {
          type: "basic",
          iconUrl: "icon48.png",
          title: "Budget Manager",
          message: "Uh oh! Looks like you've reached your limit!",
        });
    });

    totalSpan.innerText = newTotal;
    amountInput.value = "";
  });
});
