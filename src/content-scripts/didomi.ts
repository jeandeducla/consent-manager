import { TCManager } from './content-script';
import { waitForDOMElement } from './utils';

const DIDOMI_DETECTION_ID = "didomi-host";
const DIDOMI_REJECT_ALL_SELECTOR = ".didomi-continue-without-agreeing";
const DIDOMI_ACCEPT_ALL_SELECTOR = ".didomi-dismiss-button";

export var Didomi: TCManager = {
    selectAcceptAllBtn: () => {
        return document.querySelector(DIDOMI_ACCEPT_ALL_SELECTOR);
    },
    selectRejectAllBtn: () => {
        return document.querySelector(DIDOMI_REJECT_ALL_SELECTOR);
    },
    isHere: waitForDOMElement(() => document.getElementById(DIDOMI_DETECTION_ID))
                .then((el) => new Promise((resolve, reject) => {
                    return el ? resolve(true) : reject(false);
                })),
    name: "Didomi"
}
