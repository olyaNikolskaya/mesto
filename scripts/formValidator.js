export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    enableValidation() {
        this._setEventListeners(this._form)
    }

    _setEventListeners() {
        const inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        inputsList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._toggleButtonState(inputsList)
                this._isValid(inputElement);
            });
        });
    }

    _toggleButtonState(inputsList) {
        const submitButton = this._form.querySelector(this._config.submitButtonSelector);
        if(this._hasInvalidInputs(inputsList)) {
            submitButton.classList.add(this._config.inactiveButtonClass);
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove(this._config.inactiveButtonClass);
            submitButton.disabled = false;
        }
    }

    _isValid(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInputs(inputsList) {
        return inputsList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._config.popupFieldError);
        errorElement.classList.add(this._config.errorClass)
        errorElement.textContent = inputElement.validationMessage;
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.popupFieldError);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = "";
    }  
}