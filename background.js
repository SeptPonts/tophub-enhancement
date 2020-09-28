chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
})
