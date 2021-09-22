const DIDOMI_REJECT_ALL_SELECTOR = ".didomi-continue-without-agreeing";
const DIDOMI_ACCEPT_ALL_SELECTOR = ".didomi-dismiss-button";

function onError(error) {
    console.log(error);
}

function handleCanvas(canvas) {
    console.log(canvas);
    console.log(canvas.innerText);
    // canvas.click();
}

function findConsentButton(selector) {
    var observer = new MutationObserver(function (_, me) {
        var canvas = document.querySelector(selector);
        if (canvas) {
            me.disconnect();
            handleCanvas(canvas);
            return
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

function applyStrategy(strategy) {
    switch (strategy) {
        case "REJECT_ALL":
            console.log("We will reject all consent");
            findConsentButton(DIDOMI_REJECT_ALL_SELECTOR);
            break;
        case "ACCEPT_ALL":
            console.log("We will accept all consent");
            findConsentButton(DIDOMI_ACCEPT_ALL_SELECTOR);
            break;
        case "DO_NOTHING":
            console.log("We will let you decide");
            break;
        default:
            console.log("default");
            break;
    }
}

function onStrategyChange(changes, _) {
    if (changes["consentStrategy"].oldValue === "DO_NOTHING" && changes["consentStrategy"].newValue !== "DO_NOTHING") {
        applyStrategy(changes["consentStrategy"].newValue);
    }
}

/*
handle strategy change if previous state was DO_NOTHING
*/ 
browser.storage.onChanged.addListener(onStrategyChange);

/*
get application setting and apply consent strategy
*/ 
browser.storage.local.get()
    .then((strategy) => applyStrategy(strategy["consentStrategy"]))
    .catch(onError);
