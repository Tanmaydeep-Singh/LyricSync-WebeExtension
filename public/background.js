/* eslint-disable no-unused-vars */
console.log("The Background script is on");
// background.js

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FROM_CONTENT") {
    console.log("Received message from content script:", message.payload);

    chrome.runtime.sendMessage({ type: "FROM_BACKGROUND", payload: message.payload });
    console.log("Message send");
  }
});
