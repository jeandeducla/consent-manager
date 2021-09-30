import { TandCSelector } from './content-script';

const DIDOMI_REJECT_ALL_SELECTOR = ".didomi-continue-without-agreeing";
const DIDOMI_ACCEPT_ALL_SELECTOR = ".didomi-dismiss-button";

export var Didomi: TandCSelector = {
    selectAcceptAllBtn: () => {
        console.log("accept");
        return document.querySelector(DIDOMI_ACCEPT_ALL_SELECTOR);
    },
    selectRejectAllBtn: () => {
        console.log("reject");
        return document.querySelector(DIDOMI_REJECT_ALL_SELECTOR);
    }
}

