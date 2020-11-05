export default class FormValidator {
    constructor(config) {
        this._config = config;
    }

    enableValidation(form) {
        this._setEventListeners(form)
    }

    _setEventListeners(form) {
        const inputsList = Array.from(form.querySelectorAll(this._config.inputSelector));
        inputsList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._toggleButtonState(inputsList, form)
                this._isValid(inputElement, form);
            });
        });
    }

    _toggleButtonState(inputsList, form) {
        const submitButton = form.querySelector(this._config.submitButtonSelector);
        if(this._hasInvalidInputs(inputsList)) {
            submitButton.classList.add(this._config.inactiveButtonClass);
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove(this._config.inactiveButtonClass);
            submitButton.disabled = false;
        }
    }

    _isValid(inputElement, form) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, form);
        } else {
            this._hideInputError(inputElement, form);
        }
    }

    _hasInvalidInputs(inputsList) {
        return inputsList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _showInputError(inputElement, form) {
        const errorElement = form.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._config.popupFieldError);
        errorElement.classList.add(this._config.errorClass)
        errorElement.textContent = inputElement.validationMessage;
    }
    
    _hideInputError(inputElement, form) {
        const errorElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.popupFieldError);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = "";
    }  
}
