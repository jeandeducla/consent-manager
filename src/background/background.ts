import { onError } from '../utils/log';
import { STORAGE_KEY, Strategy } from '../utils/types';

console.log("Application started");

function initStrategy(strategy: { [key: string]: any }) {
    if (strategy[STORAGE_KEY] === undefined) {
        console.log("No previous strategy selected, we'll default to doing nothing");
        browser.storage.local.set({[STORAGE_KEY]: Strategy.DO_NOTHING});
    }
}

/*
initialize application
*/ 
browser.storage.local.get()
    .then(initStrategy)
    .catch(onError);
