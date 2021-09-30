import { onError } from '../utils/log';
import { STORAGE_KEY, Strategy } from '../utils/types';
import { Axeptio } from './axeptio';
import { Didomi } from './didomi';

// TODO:
// - handle null case: we should return an error and default to doing nothing if we don't find the button
export interface TandCSelector {
    selectAcceptAllBtn: () => HTMLElement | null
    selectRejectAllBtn: () => HTMLElement | null
}

// TODO:
// - handle case of not finding a TandCManager
/*
detect the appropriate consent manager for the current page we're on
*/ 
function detectTCManager(): TandCSelector {
    return Didomi;
}

var tcSelector = detectTCManager();

/*
wrapper that waits for DOM to fully load to select the targeted button
*/ 
function domMutationObserver(btnSelector: () => HTMLElement | null) {
    var observer = new MutationObserver(function (_, me) {
        var btn = btnSelector();
        if (btn) {
            me.disconnect();
            handleConsentBtn(btn);
            return
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

/*
handles action to execute on the button we found
*/ 
function handleConsentBtn(btn: HTMLElement) {
    console.log(btn);
    // btn.click();
}

/*
apply the current consent strategy 
*/ 
function applyStrategy(strategy: string) {
    switch (strategy) {
        case Strategy.REJECT_ALL:
            console.log("We will reject all consent");
            domMutationObserver(tcSelector.selectRejectAllBtn);
            break;
        case Strategy.ACCEPT_ALL:
            console.log("We will accept all consent");
            domMutationObserver(tcSelector.selectAcceptAllBtn);
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
    console.log("strategy changed");
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
