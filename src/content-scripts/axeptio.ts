// TODO:
// - didomi and axeptio must return accept all and reject all selector
// - how to differentiate between didomi and axeptio?

import { TCManager } from './content-script';
import { waitForDOMElement } from './utils';

const AXEPTIO_DETECTION_ID = "axeptio_overlay";
const AXEPTIO_REJECT_ALL_ID = "axeptio_btn_dismiss";
const AXEPTIO_ACCEPT_ALL_ID = "axeptio_btn_acceptAll";

export var Axeptio: TCManager = {
    selectAcceptAllBtn: waitForDOMElement(() => document.getElementById(AXEPTIO_ACCEPT_ALL_ID)),
    selectRejectAllBtn: waitForDOMElement(() => document.getElementById(AXEPTIO_REJECT_ALL_ID)),
    isHere: waitForDOMElement(() => document.getElementById(AXEPTIO_DETECTION_ID))
                .then((el) => new Promise((resolve, reject) => {
                    return el ? resolve(true) : reject(false);
                })),
    name: "Axeptio"
}
