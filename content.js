// every option key is listed below
const optionKeys = {
    isAdRemove: true,
    isAppRecommendRemove: true,
    isAutoDarkMode: true,
    isDarkModeEnhance: true,
    isAutoScroll: true
};
// every styleSheet that needed to be inserted is listed below
let styleSheets = [
    `
        .logoPlaceHolder {
            display: block;
            box-sizing: content-box;
            margin-left: auto;
            margin-right: auto;
            width: 150px;
            height: 150px;
        }
    `,
    `.dark .cc-cd-ih .cc-cd-is a{color:#FFFFFF}`,
    `
    #loader-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    }
    #loader {
        display: block;
        position: relative;
        left: 50%;
        top: 50%;
        width: 150px;
        height: 150px;
        margin: -75px 0 0 -75px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #3498db;
        -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    }
    #loader:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #e74c3c;
        -webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    }
    #loader:after {
        content: "";
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #f9c922;
        -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    }
    @-webkit-keyframes spin {
        0%   {
        -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(0deg);  /* IE 9 */
        transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
        }
        100% {
        -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(360deg);  /* IE 9 */
        transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
        }
    }
    @keyframes spin {
        0%   {
        -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(0deg);  /* IE 9 */
        transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
        }
        100% {
        -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: rotate(360deg);  /* IE 9 */
        transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
        }
    }
    #loader-wrapper .loader-section {
        position: fixed;
        top: 0;
        width: 51%;
        height: 100%;
        background: #222222;
        z-index: 10000;
    }
    #loader-wrapper .loader-section.section-left {
        left: 0;
    }
    #loader-wrapper .loader-section.section-right {
        right: 0;
    }
    #loader {
        z-index: 10001;
    }
    .loaded #loader-wrapper .loader-section.section-left {
        -webkit-transform: translateX(-100%);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: translateX(-100%);  /* IE 9 */
        transform: translateX(-100%);  /* Firefox 16+, IE 10+, Opera */
    }
    .loaded #loader-wrapper .loader-section.section-right {
        -webkit-transform: translateX(100%);  /* Chrome, Opera 15+, Safari 3.1+ */
        -ms-transform: translateX(100%);  /* IE 9 */
        transform: translateX(100%);  /* Firefox 16+, IE 10+, Opera */
    }
    .loaded #loader-wrapper .loader-section.section-left,
    .loaded #loader-wrapper .loader-section.section-right {
        -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
        transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
    }
    .loaded #loader {
        opacity: 0;
        -webkit-transition: all 0.3s ease-out;
        transition: all 0.3s ease-out;
    }
    .loaded #loader-wrapper {
        visibility: hidden;
    }
    .loaded #loader-wrapper {
        -webkit-transform: translateY(-100%);
        -ms-transform: translateY(-100%);
        transform: translateY(-100%);
 
        -webkit-transition: all 0.3s 1s ease-out;
        transition: all 0.3s 1s ease-out;
    }
    `
]
// every html component that needed to be inserted is listed below
const Components = [
    `
    <div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
    </div>
    `
]

// hide page with a preloading page initially, and show page after window.onload event
function hideShowPage() {
    const htmlElement = document.getElementsByTagName("html")[0];
    addHtmlComponent(Components[0], 'div', htmlElement, "OuterWrapper", "");
    addInternalStyleSheet(styleSheets[2]);
    window.addEventListener('load', () => {
        const wrapperElement = document.getElementById("OuterWrapper");
        wrapperElement.classList.toggle("loaded");
    });
}

// actions for those needed to be taken before the page shows
function actionsBeforePageShow(optionKeys, styleSheets) {
    // restore options from storage sync area
    chrome.storage.sync.get(optionKeys, function (items) {
        addInternalStyleSheet(styleSheets[0]);

        // if options are checked by user, execute these functions
        if (items.isAdRemove) {
            AdRemove();
        }
        if (items.isAppRecommendRemove) {
            AppRecommendRemove();
        }
        if (items.isAutoDarkMode) {
            AutoDarkMode();
        }
        if (items.isDarkModeEnhance) {
            DarkModeEnhance();
        }
    });
}

// actions for those needed to be taken after the page shows
function actionsAfterPageShow(optionKeys, styleSheets) {
    // restore options from storage sync area
    chrome.storage.sync.get(optionKeys, function (items) {
        // if options are checked by user, execute these functions
        if (items.isAutoScroll) {
            AutoScroll();
        }
        if (items.isAdRemove) {
            AdRemove(false);
        }
        if (items.isAppRecommendRemove) {
            AppRecommendRemove();
        }
    })
}

// add target internal style sheet for current html
function addInternalStyleSheet(TargetStyleSheet) {
    // create styleSheet variable's content
    let styleSheet = TargetStyleSheet;
    // css in HTML (internal css)
    let s = document.createElement('style');
    s.innerHTML = styleSheet;
    // (a || b) === a, if a exists, otherwise (a || b) === b
    (document.head || document.documentElement).appendChild(s);
}

// add target html component for current html
function addHtmlComponent(TargetComponent, ComponentType, ParentNode, componentID, componentClass) {
    let componentContent = TargetComponent;
    let el = document.createElement(ComponentType);
    el.innerHTML = componentContent;
    if (componentID !== undefined && componentID !== "") {
        if (componentClass !== undefined && componentClass !== "") {
            el.id = componentID;
            el.className = componentClass;
        } else {
            el.id = componentID;
        }
    } else {
        if (componentClass !== undefined && componentClass !== "") {
            el.className = componentClass;
        }
    }
    if (ParentNode !== undefined && ParentNode !== "") {
        ParentNode.appendChild(el);
    } else {
        (document.head || document.documentElement).appendChild(el);
    }
}

// remove banner ad
function AdRemove(isReplace = true) {
    let logo = document.createElement("img");
    logo.src = "https://file.ipadown.com/tophub/assets/images/logo.png";
    logo.alt = "logo";
    logo.className = "logoPlaceHolder";

    const newRecommend = document.getElementsByClassName("qc")[0];
    try {
        const recommendParent = newRecommend.parentNode;
        if (recommendParent) {
            if (isReplace === true) {
                recommendParent.replaceChild(logo, newRecommend);
            } else {
                recommendParent.removeChild(newRecommend);
            }
        }
    } catch {
    }
}

// remove app recommendation info
function AppRecommendRemove() {
    const adBanner = document.getElementsByClassName("alert-warning")[0];
    try {
        if (adBanner.parentNode) {
            adBanner.parentNode.removeChild(adBanner);
        }
    } catch {
    }
}

// set auto dark mode based on system(browser) theme setting
function AutoDarkMode() {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    const bodyElement = document.getElementsByTagName("body")[0]
    const switchElement = document.getElementsByClassName("switch")[0]

    if (userPrefersDark) {
        if (bodyElement.classList[0] === undefined) {
            bodyElement.classList.toggle("dark");
            switchElement.classList.toggle("on");
        }
    }
    if (userPrefersLight) {
        if (bodyElement.classList[0] === "dark") {
            bodyElement.classList.toggle("dark");
            switchElement.classList.toggle("on");
        }
    }
}

// enhance page's style in dark mode
function DarkModeEnhance() {
    addInternalStyleSheet(styleSheets[1]);
}

// auto scroll to given position
function AutoScroll() {
    if (window.scrollTo) {
        window.scrollTo({"behavior": "smooth", "top": 210});
    }
}

class Content {
    constructor(optionKeys, styleSheets) {
        this.optionKeys = optionKeys;
        this.styleSheets = styleSheets;
    }

    contentMainFunc() {
        hideShowPage();
        // if there is a "this" containing in a class's method, then it is pointed to the instance of the class by default
        document.addEventListener('DOMContentLoaded', () => {
            actionsBeforePageShow(this.optionKeys, this.styleSheets)
        });
        window.addEventListener('load', () => {
            actionsAfterPageShow(this.optionKeys, this.styleSheets)
        });
    }
}

const content = new Content(optionKeys, styleSheets);
content.contentMainFunc();