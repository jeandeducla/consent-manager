function onError(error) {
    console.log(error);
}

function updateUI(strategy) {
    var radios = document.getElementsByName("consent-choice");
    for (const rb of radios) {
        if (rb.value === strategy["consentStrategy"]) {
            rb.checked = true;
        }
    }
}

function storeSetting() {
    var radios = document.getElementsByName("consent-choice");
    for (const rb of radios) {
       if (rb.checked === true) {
           console.log("You chose to submit " + rb.value);
           browser.storage.local.set({"consentStrategy": rb.value});
           break;
       }
    }
}

/*
Update UI with last selected value when opening popup
*/ 
browser.storage.local.get()
    .then(updateUI)
    .catch(onError);

/*
On submitting form, store new setting 
*/ 
var form = document.querySelector("form");
form.addEventListener("submit", storeSetting);
