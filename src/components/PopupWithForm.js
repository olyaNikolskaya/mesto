import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._popupForm = this._popup.querySelector('.popup__form')
    }

    setSubmitHandler(submit) {
        this._submit = submit
    }

    open() {
        super.open();
        this._popup.addEventListener('submit', this._submit)
    }

    close() {
        super.close();
        this._popup.removeEventListener('submit', this._submit)
        this._popupForm.reset();
    }

    setInputValue(data){
        const inputsArray = Array.from(this._popup.querySelectorAll('.popup__field'));
        inputsArray.forEach((item) => {
            item.value = data[item.name];
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

    renderLoading(isLoading) {
        const saveButton = this._popupForm.querySelector('.popup__save-button')
        if(isLoading) {
            saveButton.textContent = "Сохранение..."
        } else {
            saveButton.textContent = "Сохранить"
        }
    }
}