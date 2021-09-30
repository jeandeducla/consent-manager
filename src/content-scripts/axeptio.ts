// TODO:
// - didomi and axeptio must return accept all and reject all selector
// - how to differentiate between didomi and axeptio?

import { TandCSelector } from './content-script';

const AXEPTIO_REJECT_ALL_ID = "axeptio_btn_dismiss";
const AXEPTIO_ACCEPT_ALL_ID = "axeptio_btn_acceptAll";

export var Axeptio: TandCSelector = {
    selectAcceptAllBtn: () => {
        return document.getElementById(AXEPTIO_ACCEPT_ALL_ID);
    },
    selectRejectAllBtn: () => {
        return document.getElementById(AXEPTIO_REJECT_ALL_ID);
    }
}

