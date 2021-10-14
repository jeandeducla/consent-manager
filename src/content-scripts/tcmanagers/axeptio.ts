import { TCManager } from './tcmanager';
import { waitForDOMElement, PromiseTimeOut } from '../utils';

const AXEPTIO_DETECTION_ID = "axeptio_overlay";
const AXEPTIO_REJECT_ALL_ID = "axeptio_btn_dismiss";
const AXEPTIO_ACCEPT_ALL_ID = "axeptio_btn_acceptAll";

export class Axeptio extends TCManager {
    readonly name;

    constructor() {
        super();
        this.name = "Axeptio";
    }

    async selectAcceptAllBtn(): Promise<HTMLElement> {
        return new PromiseTimeOut(1000)
            .wrap(waitForDOMElement(() => {
                return document.getElementById(AXEPTIO_ACCEPT_ALL_ID);
            }));
    }

    async selectRejectAllBtn(): Promise<HTMLElement> {
        return new PromiseTimeOut(1000)
            .wrap(waitForDOMElement(() => {
                return document.getElementById(AXEPTIO_REJECT_ALL_ID);
            }));
    }

    async isHere(): Promise<boolean> {
        return new PromiseTimeOut(1000)
            .wrap(waitForDOMElement(() => {
                return document.getElementById(AXEPTIO_DETECTION_ID);
            }))
            .then((el) => new Promise((resolve, reject) => {
                return el ? resolve(true) : reject(false);
            }));
    }
}
