const form = document.querySelector('#contact-form');
const fullName = document.querySelector('#name');
const countryName = document.querySelector('#country');
const fullAddress = document.querySelector('#address');
const telephone = document.querySelector('#telephone');
const fullMessage = document.querySelector('#message');
const submitButton = document.querySelector(".submission");
const continueButton = document.querySelector('.continue-btn');
const checkoutButton = document.querySelector('.container-cart');

//utility functions
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isValidPhone = (p) => {
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
}

//adds success class
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

//adds error class
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

//validation for fullname
const checkFullName = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const username = fullName.value.trim();

    if (!isRequired(username)) {
        showError(fullName, 'Please enter your  name');
    } else if (!isBetween(username.length, min, max)) {
        showError(fullName, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(fullName);
        valid = true;
    }
    return valid;
}
//validation for country
const checkCountry = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const country = countryName.value.trim();

    if (!isRequired(country)) {
        showError(countryName, 'Please enter your country');
    } else if (!isBetween(country.length, min, max)) {
        showError(countryName, `Country name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(countryName);
        valid = true;
    }
    return valid;
}

//validation for address
const checkAddress = () => {

    let valid = false;
    const min = 7,
        max = 45;
    const address = fullAddress.value.trim();

    if (!isRequired(address)) {
        showError(fullAddress, 'Please enter your full address');
    } else if (!isBetween(address.length, min, max)) {
        showError(fullAddress, `Address name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(fullAddress);
        valid = true;
    }
    return valid;
}

//validation for phone
const checkPhoneNumber = () => {
    let valid = false;
    const phone = telephone.value.trim();
    if (!isRequired(phone)) {
        showError(telephone, 'Phone cannot be blank.');
    } else if (!isValidPhone(phone)) {
        showError(telephone, 'Phone is not valid.')
    } else {
        showSuccess(telephone);
        valid = true;
    }
    return valid;
}

//validation for message
const checkMessage = () => {

    let valid = false;
    const min = 25,
        max = 255;
    const message = fullMessage.value.trim();

    if (!isRequired(message)) {
        showError(fullMessage, 'Please enter your message');
    } else if (!isBetween(message.length, min, max)) {
        showError(fullMessage, `Message name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(fullMessage);
        valid = true;
    }
    return valid;
}



form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    //validate form
    let isFullNameValid = checkFullName(),
        isCountryValid = checkCountry(),
        isAddressValid = checkAddress(),
        isPhoneNumberValid = checkPhoneNumber(),
        isMessageValid = checkMessage();

    let isFormValid = isFullNameValid && isCountryValid && isAddressValid && isPhoneNumberValid && isMessageValid;

    if (isFormValid) {
        if (submitButton) {
            submitButton.classList.add('show-success-message');
            setTimeout(() => {
                submitButton.classList.remove('show-success-message');
            }, 1000);
        }
        
        if(checkoutButton){
            checkoutButton.style.display = "block";

        }

        if(continueButton){
            continueButton.style.display = "none";
        }

        console.log(checkoutButton);
        fullName.value = '';
        countryName.value = '';
        fullAddress.value = '';
        telephone.value = '';
        fullMessage.value = '';
        fullName.parentElement.classList.remove('success');
        countryName.parentElement.classList.remove('success');
        fullAddress.parentElement.classList.remove('success');
        telephone.parentElement.classList.remove('success');
        fullMessage.parentElement.classList.remove('success');


    }
});