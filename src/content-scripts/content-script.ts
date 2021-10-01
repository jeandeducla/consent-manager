import { onError } from '../utils/log';
import { STORAGE_KEY, Strategy } from '../utils/types';
import { waitForDOMElement } from './utils';
import { Axeptio } from './axeptio';
import { Didomi } from './didomi';

// TODO:
// - handle null case: we should return an error and default to doing nothing if we don't find the button
// - all element Should be promise
export interface TCManager {
    // TODO: maybe should not be a function
    selectAcceptAllBtn: () => HTMLElement | null
    selectRejectAllBtn: () => HTMLElement | null
    isHere: Promise<boolean>
    name: string
}

const TCManagers = [
    Didomi,
    Axeptio,
];

// TODO:
// - handle case of not finding a TandCManager
/*
detect the appropriate consent manager for the current page we're on
*/ 
async function detectTCManager(): Promise<TCManager> {
    return Promise.any(TCManagers.map(tc => tc.isHere.then(() => tc)))
}

console.log("ta mere");

detectTCManager().
    then((tcManager) => {
        console.log("We've detected the following consent manager: " + tcManager.name);

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
                    waitForDOMElement(tcManager.selectRejectAllBtn)
                        .then((el) => handleConsentBtn(el));
                    break;
                case Strategy.ACCEPT_ALL:
                    console.log("We will accept all consent");
                    waitForDOMElement(tcManager.selectAcceptAllBtn)
                        .then((el) => handleConsentBtn(el));
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
    });
