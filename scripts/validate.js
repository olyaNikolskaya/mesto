 const configObj = {
        formSelector: '.popup__form',
        inputSelector: '.popup__field',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__field-error-text',
        errorClass: 'popup__field-error-text_visible'
    }

function showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add('popup__field_error');
    errorElement.classList.add(inputErrorClass)
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, inputErrorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__field_error');
    errorElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
}

function isValid(formElement, inputElement, errorClass) {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, errorClass);
    } else {
        hideInputError(formElement, inputElement, errorClass);
    }
}

function hasInvalidInputs(inputsList) {
    return inputsList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputsList, submitButton, inactiveButtonClass) {
    if(hasInvalidInputs(inputsList)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    }
}

function setInputsEventsListeners(form, configObj) {
    const inputsList = Array.from(form.querySelectorAll(configObj.inputSelector));
    const submitButton = form.querySelector(configObj.submitButtonSelector);
    inputsList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            toggleButtonState(inputsList, submitButton, configObj.inactiveButtonClass)
            isValid(form, inputElement, configObj.errorClass);
        });
    });
}

function enableValidation(configObj){
    const formsList = Array.from(document.querySelectorAll(configObj.formSelector));
    formsList.forEach((form) => {
        setInputsEventsListeners(form, configObj)
        });
}

enableValidation(configObj);