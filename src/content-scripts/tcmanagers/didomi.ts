import { TCManager } from './tcmanager';
import { waitForDOMElement, PromiseTimeOut } from '../utils';

const DIDOMI_DETECTION_ID = "didomi-host";
const DIDOMI_REJECT_ALL_SELECTOR = ".didomi-continue-without-agreeing";
const DIDOMI_ACCEPT_ALL_SELECTOR = ".didomi-dismiss-button";

export class Didomi extends TCManager {
    readonly name;

    constructor() {
        super();
        this.name = "Didomi";
    }

    async selectAcceptAllBtn(): Promise<HTMLElement> {
        return new PromiseTimeOut(1000)
            .wrap(waitForDOMElement(() => {
                return document.querySelector(DIDOMI_ACCEPT_ALL_SELECTOR);
            }));
    }

    async selectRejectAllBtn(): Promise<HTMLElement> {
        return new PromiseTimeOut(1000)
            .wrap(waitForDOMElement(() => {
                return document.querySelector(DIDOMI_REJECT_ALL_SELECTOR);
            }));
    }

    async isHere(): Promise<boolean> {
        return new PromiseTimeOut(1000)
            .wrap(waitForDOMElement(() => {
                return document.getElementById(DIDOMI_DETECTION_ID);
            }))
            .then((el) => new Promise((resolve, reject) => {
                return el ? resolve(true) : reject(false);
            }));
    }
}
