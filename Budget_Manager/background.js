chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "spendMoney",
    title: "Spend Money",
    contexts: ["selection"],
  });
});

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) === value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
  if (menuItemId === "spendMoney" && selectionText)
    if (isInt(+selectionText))
      chrome.storage.sync.get(["total", "limit"], ({ total, limit }) => {
        let newTotal = 0;
        if (total) newTotal += +total;
        newTotal += +selectionText;

        chrome.storage.sync.set({ total: newTotal }, () => {
          if (newTotal >= limit)
            chrome.notifications.create("limitNotify", {
              type: "basic",
              iconUrl: "icon48.png",
              title: "Budget Manager",
              message: "Uh oh! Looks like you've reached your limit!",
            });
        });
      });
});
