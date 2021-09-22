console.log("Application started");

const DEFAULT_STRATEGY = "DO_NOTHING";

function onError(error) {
    console.log(error);
}

function initStrategy(strategy) {
    if (strategy["consentStrategy"] === undefined) {
        console.log("No previous strategy selected, we'll default to doing nothing");
        browser.storage.local.set({"consentStrategy": DEFAULT_STRATEGY});
    }
}

/*
initialize application
*/ 
browser.storage.local.get()
    .then(initStrategy)
    .catch(onError);
