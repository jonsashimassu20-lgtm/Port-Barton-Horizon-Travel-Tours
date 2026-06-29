const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('Lname');
const countryNameInput = document.getElementById('country-search');
const countrySelectHidden = document.getElementById('country-input');
const streetInput = document.getElementById('street');
const townInput = document.getElementById('town');
const selectCountyInput = document.getElementById('state-county');
const postalCodeInput = document.getElementById('zip');
const emailInput = document.getElementById('Email');
const phoneInput = document.getElementById('phone');
const locationInput = document.getElementById('location');
const addMessageInput = document.getElementById('add-message');

const fnameLabel = document.getElementById('fname-label');
const lnameLabel = document.getElementById('lname-label');
const countryLabel = document.getElementById('country-name-label');
const streetLabel = document.getElementById('street-label');
const townLabel = document.getElementById('town-label');
const stateLabel = document.getElementById('state-label');
const postalCodeLabel = document.getElementById('postalcode-label');
const emailLabel = document.getElementById('email-label');
const phoneLabel = document.getElementById('phone-label');
const locationLabel = document.getElementById('location-label');

const fNameErrorMsg = document.getElementById('fname-error-msg');
const lNameErrorMsg = document.getElementById('lname-error-msg');
const countrySelectErrorMsg = document.getElementById('selectcountry-error-msg');
const addressErrorMsg = document.getElementById('street-error-msg');
const townErrorMsg = document.getElementById('town-error-msg');
const selectCountyErrorMsg = document.getElementById('selectcounty-error-msg');
const postalCodeErrorMsg = document.getElementById('postalcode-error-msg');
const emailErrorMsg = document.getElementById('email-error-msg');
const phoneErrorMsg = document.getElementById('phone-error-msg');
const pickupErrorMsg = document.getElementById('pickup-error-msg');
const selectDisplayErrorMsg = document.getElementById('country-display');

const placeOrderValidation = document.getElementById('place-order-btn');

placeOrderValidation.addEventListener('click', function (event) {

    event.preventDefault();

    const nameRegex = /^[a-zA-ZñÑ\s]+$/;
    const fNameVal = fnameInput.value.trim();
    const lNameVal = lnameInput.value.trim();

    const countrySelectVal = countrySelectHidden.value;
    const addressVal = streetInput.value.trim();
    const townVal = townInput.value.trim();
    const selectCountyVal = selectCountyInput.value;
    const postalCodeVal = postalCodeInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailVal = emailInput.value.trim();

    const phoneVal = phoneInput.value.trim();
    const pickupVal = locationInput.value.trim();

    if (fNameVal === "") {

        fnameLabel.classList.add('error-text');
        fnameInput.classList.add('error-input');

    } else if (fNameVal.length > 50) {

        fnameLabel.classList.add('error-text');
        fnameInput.classList.add('error-input');

    } else if (!nameRegex.test(fNameVal)) {

        fNameErrorMsg.classList.add('show');
        fnameLabel.classList.add('error-text');
        fnameInput.classList.add('error-input');

    } else {

        fNameErrorMsg.classList.remove('show');
        fnameLabel.classList.remove('error-text');
        fnameInput.classList.remove('error-input');
    }
    //==================================================last name validators
    if (lNameVal === "") {

        lnameLabel.classList.add('error-text');
        lnameInput.classList.add('error-input');

    } else if (lNameVal.length > 50) {

        lnameLabel.classList.add('error-text');
        lnameInput.classList.add('error-input');

    } else if (!nameRegex.test(lNameVal)) {

        lNameErrorMsg.classList.add('show');
        lnameLabel.classList.add('error-text');
        lnameInput.classList.add('error-input');

    } else {

        lNameErrorMsg.classList.remove('show');
        lnameLabel.classList.remove('error-text');
        lnameInput.classList.remove('error-input');
    }

    //================================================select country

    if (countrySelectVal === "") {

        countrySelectErrorMsg.classList.add('show');
        countryLabel.classList.add('error-text');
        selectDisplayErrorMsg.classList.add('error-input');

    } else {
        countrySelectErrorMsg.classList.remove('show');
        countryLabel.classList.remove('error-text');
        selectDisplayErrorMsg.classList.remove('error-input');
    }

    //===============================================address


    if (addressVal === "") {

        addressErrorMsg.classList.add('show');
        streetLabel.classList.add('error-text');
        streetInput.classList.add('error-input');

    } else if (addressVal.length < 5) {

        addressErrorMsg.classList.add('show');
        streetLabel.classList.add('error-text');
        streetInput.classList.add('error-input');

    } else {

        addressErrorMsg.classList.remove('show');
        streetLabel.classList.remove('error-text');
        streetInput.classList.remove('error-input');
    }

    //============================================================town/city==========

    if (townVal === "") {

        townErrorMsg.classList.add('show');
        townLabel.classList.add('error-text');
        townInput.classList.add('error-input');

    } else if (townVal.length < 5) {

        townErrorMsg.classList.add('show');
        townLabel.classList.add('error-text');
        townInput.classList.add('error-input');

    } else {

        townErrorMsg.classList.remove('show');
        townLabel.classList.remove('error-text');
        townInput.classList.remove('error-input');
    }

    //============================================================select county val

    if (selectCountyVal === "") {

        selectCountyErrorMsg.classList.add('show');
        stateLabel.classList.add('error-text');
        selectCountyInput.classList.add('error-input');

    } else {

        selectCountyErrorMsg.classList.remove('show');
        stateLabel.classList.remove('error-text');
        selectCountyInput.classList.remove('error-input');
    }

    //==============================================================postalcode

    if (postalCodeVal === "") {

        postalCodeErrorMsg.classList.add('show');
        postalCodeLabel.classList.add('error-text');
        postalCodeInput.classList.add('error-input');

    } else if (postalCodeVal.length < 4) {

        postalCodeErrorMsg.classList.add('show');
        postalCodeLabel.classList.add('error-text');
        postalCodeInput.classList.add('error-input');

    } else {
        postalCodeErrorMsg.classList.remove('show');
        postalCodeLabel.classList.remove('error-text');
        postalCodeInput.classList.remove('error-input');
    }
    //=======================================================email======

    if (emailVal === "" || !emailRegex.test(emailVal)) {

        emailErrorMsg.classList.add('show');
        emailLabel.classList.add('error-text');
        emailInput.classList.add('error-input');

    } else {

        emailErrorMsg.classList.remove('show');
        emailLabel.classList.remove('error-text');
        emailInput.classList.remove('error-input');

    }
    //====================================================phone contacts=======//

    if (phoneVal === "" || phoneVal.length < 5) {

        phoneErrorMsg.classList.add('show');
        phoneLabel.classList.add('error-text');
        phoneInput.classList.add('error-input');

    } else {

        phoneErrorMsg.classList.remove('show');
        phoneLabel.classList.remove('error-text');
        phoneInput.classList.remove('error-input');
    }

    //=======================================================pick up location

    if (pickupVal === "" || pickupVal.length < 5) {

        pickupErrorMsg.classList.add('show');
        locationLabel.classList.add('error-text');
        locationInput.classList.add('error-input');

    } else {
        pickupErrorMsg.classList.remove('show');
        locationLabel.classList.remove('error-text');
        locationInput.classList.remove('error-input');
    }

});


fnameInput.addEventListener('input', function () {
    const nameRegex = /^[a-zA-ZñÑ\s]+$/;
    const fNameVal = fnameInput.value.trim();

    if (fNameVal === "" || nameRegex.test(fNameVal)) {
        fNameErrorMsg.classList.remove('show');
        fnameLabel.classList.remove('error-text');
        fnameInput.classList.remove('error-input');
    }

});

lnameInput.addEventListener('input', function () {
    const nameRegex = /^[a-zA-ZñÑ\s]+$/;
    const lNameVal = lnameInput.value.trim();

    if (lNameVal === "" || nameRegex.test(lNameVal)) {
        lNameErrorMsg.classList.remove('show');
        lnameLabel.classList.remove('error-text');
        lnameInput.classList.remove('error-input');
    }
});

streetInput.addEventListener('input', function () {

    const addressVal = streetInput.value.trim();

    if (addressVal === "" || addressVal.length >= 5) {

        addressErrorMsg.classList.remove('show');
        streetLabel.classList.remove('error-text');
        streetInput.classList.remove('error-input');
    }
});

townInput.addEventListener('input', function () {

    const townVal = townInput.value.trim();

    if (townVal === "" || townVal.length >= 5) {

        townErrorMsg.classList.remove('show');
        townLabel.classList.remove('error-text');
        townInput.classList.remove('error-input');
    }
});

selectCountyInput.addEventListener('input', function () {

    if (countrySelectHidden !== "") {

        selectCountyErrorMsg.classList.remove('show');
        stateLabel.classList.remove('error-text');
        selectCountyInput.classList.remove('error-input');
    }

});

postalCodeInput.addEventListener('input', function () {

    const postalCodeVal = postalCodeInput.value.trim();

    if (postalCodeVal === "" || postalCodeVal.length >= 4) {

        postalCodeErrorMsg.classList.remove('show');
        postalCodeLabel.classList.remove('error-text');
        postalCodeInput.classList.remove('error-input');
    }

});

emailInput.addEventListener('input', function () {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailVal = emailInput.value.trim();

    if (emailVal === "" || !emailRegex.test(emailVal)) {

        emailErrorMsg.classList.add('show');
        emailLabel.classList.add('error-text');
        emailInput.classList.add('error-input');

    } else {

        emailErrorMsg.classList.remove('show');
        emailLabel.classList.remove('error-text');
        emailInput.classList.remove('error-input');

    }

});

phoneInput.addEventListener('input', function () {

    const phoneVal = phoneInput.value.trim();

    if (phoneVal === "" || phoneVal.length < 5) {

        phoneErrorMsg.classList.add('show');
        phoneLabel.classList.add('error-text');
        phoneInput.classList.add('error-input');

    } else {

        phoneErrorMsg.classList.remove('show');
        phoneLabel.classList.remove('error-text');
        phoneInput.classList.remove('error-input');
    }

});

locationInput.addEventListener('input', function () {

    const pickupVal = locationInput.value.trim();

    if (pickupVal === "" || pickupVal.length < 5) {

        pickupErrorMsg.classList.add('show');
        locationLabel.classList.add('error-text');
        locationInput.classList.add('error-input');

    } else {

        pickupErrorMsg.classList.remove('show');
        locationLabel.classList.remove('error-text');
        locationInput.classList.remove('error-input');
    }

});

