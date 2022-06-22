const totalSpan = document.querySelector("span#total");
const amountInput = document.querySelector("input#amount");
const formEl = document.querySelector("form");

chrome.storage.sync.get("total", ({ total }) => {
  totalSpan.innerText = total;
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  chrome.storage.sync.get("total", ({ total }) => {
    let newTotal = 0;
    if (total) newTotal += +total;
    if (amountInput.value) newTotal += +amountInput.value;

    chrome.storage.sync.set({ total: newTotal });

    totalSpan.innerText = newTotal;
    amountInput.value = "";
  });
});
