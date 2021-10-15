import { onError } from '../utils/log';
import { STORAGE_KEY } from '../utils/types';

function updateUI(strategy: { [key: string]: any }) {
    const radios = document.getElementsByName("consent-choice");
    for (const rb of radios) {
       if (rb instanceof HTMLInputElement) {
            if (rb.value === strategy[STORAGE_KEY]) {
                rb.checked = true;
            }
       }
    }
}

function storeSetting() {
    const radios = document.getElementsByName("consent-choice");
    for (const rb of radios) {
       if (rb instanceof HTMLInputElement) {
           if (rb.checked === true) {
               console.log("You chose to submit " + rb.value);
               browser.storage.local.set({[STORAGE_KEY]: rb.value});
               break;
           }
        }
    }
}

/*
 * update UI with last selected value when opening popup
 */ 
browser.storage.local.get()
    .then(updateUI)
    .catch(onError);

/*
 * on submitting form, store new setting 
 */ 
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", storeSetting);
}
