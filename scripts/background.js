console.log('BACK WORKS');

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, message);
  });
});
