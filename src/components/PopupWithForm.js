import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._popupForm = this._popup.querySelector('.popup__form')
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submit)
    }

    setInputValue(userInfo){
        const inputsArray = Array.from(this._popup.querySelectorAll('.popup__field'));
        inputsArray.forEach((item) => {
            item.value = userInfo[item.name];
        });
    }
    
    getInputValues() {
        const inputsArray = Array.from(this._popup.querySelectorAll('.popup__field'));
        const objInputValues = {};
        inputsArray.forEach((item) => {
            objInputValues[item.name] = item.value;
        });
        return objInputValues;
    }

    disableSubmitButton() {
        const submitButton = this._popupForm.querySelector('.popup__save-button')
        submitButton.classList.add('popup__save-button_disabled');
        submitButton.disabled = true;
    }
}