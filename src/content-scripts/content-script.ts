import { onError } from '../utils/log';
import { STORAGE_KEY, Strategy } from '../utils/types';
import { TCManager } from './tcmanagers/tcmanager';
import { Axeptio } from './tcmanagers/axeptio';
import { Didomi } from './tcmanagers/didomi';

const TCManagers = [
    new Axeptio(),
    new Didomi(),
];

/* 
 * detect the appropriate consent manager for the current page we're on
 */ 
async function detectTCManager(): Promise<TCManager> {
    return Promise.any(TCManagers.map(tc => tc.isHere().then(() => tc)))
}

detectTCManager().
    then((tcManager) => {
        console.log("We've detected the following consent manager: " + tcManager.name);

        /*
         * handle consent strategy changes
         */ 
        browser.storage.onChanged.addListener((changes: any) => {
            if (changes[STORAGE_KEY].oldValue === Strategy.DO_NOTHING &&
                changes[STORAGE_KEY].newValue !== Strategy.DO_NOTHING) {
                tcManager.applyStrategy(changes[STORAGE_KEY].newValue);
            }
        });

        /*
         * get application setting and apply consent strategy
         */ 
        browser.storage.local.get()
            .then((strategy) => tcManager.applyStrategy(strategy[STORAGE_KEY]))
            .catch(onError);
    });
