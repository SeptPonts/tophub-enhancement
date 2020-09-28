// options.js is not registered in manifest.json
// however, this script is popup.html's external script
// so when popup.html is showed, this script will be executed

// once popup page's DOM content is loaded, restore options
document.addEventListener('DOMContentLoaded', restore_options);
// once save button is clicked, save options
document.getElementById('saveButton').addEventListener('click', save_options);

// every option & key are listed below
const defaultOptions = {
    isAdRemove: true,
    isAppRecommendRemove: true,
    isAutoDarkMode: true,
    isDarkModeEnhance: true,
    isAutoScroll: true
};
const optionKeys = Object.keys(defaultOptions);
// user's choice about each option
let optionsDict = Object.assign({}, defaultOptions);

// Saves options to chrome.storage
// make sure each options are listed
function save_options() {
    for (let key of optionKeys) {
        let value = document.getElementById(key).checked;
        Object.defineProperty(optionsDict, key, {value: value});
    }

    chrome.storage.sync.set(optionsDict, function () {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.innerText = '设定已保存';
        setTimeout(function () {
            status.innerText = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
// make sure each options are listed
function restore_options() {
    chrome.storage.sync.get(optionsDict, function (items) {
        for (let key of optionKeys) {
            document.getElementById(key).checked = items[key];
        }
    });
}
