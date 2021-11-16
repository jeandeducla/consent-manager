import { onError } from '../utils/log';
import { STORAGE_KEY } from '../utils/types';

function updateUI(strategy: { [key: string]: any }) {
    const choices = document.getElementsByClassName("consentChoices");
    console.log(choices);
    for (const choice of choices) {
       // TODO: remove that
       let rb = choice.childNodes[1];
       if (rb instanceof HTMLInputElement) {
            if (rb.value === strategy[STORAGE_KEY]) {
                rb.checked = true;
                choice.classList.add("checked");
            } else {
                choice.classList.remove("checked");
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
