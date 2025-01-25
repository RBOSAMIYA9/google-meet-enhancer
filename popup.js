document.getElementById("inject").addEventListener("click", () => {
    // Inject the content script into the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab.url.includes("https://meet.google.com")) {
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: ["content.js"],
            });
        } else {
            alert("This extension works only on Google Meet.");
        }
    });
});
