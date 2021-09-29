import { onError } from '../utils/log';
import { STORAGE_KEY, Strategy } from '../utils/types';

const DIDOMI_REJECT_ALL_SELECTOR = ".didomi-continue-without-agreeing";
const DIDOMI_ACCEPT_ALL_SELECTOR = ".didomi-dismiss-button";

function handleCanvas(canvas: Element) {
    if (canvas instanceof HTMLElement) {
        console.log(canvas);
        console.log(canvas.innerText);
        // canvas.click();
    }
}

function findConsentButton(selector: string) {
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

function applyStrategy(strategy: string) {
    switch (strategy) {
        case Strategy.REJECT_ALL:
            console.log("We will reject all consent");
            findConsentButton(DIDOMI_REJECT_ALL_SELECTOR);
            break;
        case Strategy.ACCEPT_ALL:
            console.log("We will accept all consent");
            findConsentButton(DIDOMI_ACCEPT_ALL_SELECTOR);
            break;
        case Strategy.DO_NOTHING:
            console.log("We will let you decide");
            break;
        default:
            console.log("should not come here");
            break;
    }
}

function onStrategyChange(changes: any, _: any) {
    if (changes[STORAGE_KEY].oldValue === Strategy.DO_NOTHING && changes[STORAGE_KEY].newValue !== Strategy.DO_NOTHING) {
        applyStrategy(changes[STORAGE_KEY].newValue);
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
    .then((strategy) => applyStrategy(strategy[STORAGE_KEY]))
    .catch(onError);
