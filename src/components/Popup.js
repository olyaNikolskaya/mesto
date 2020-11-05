export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._popupIsOpenedSelector = 'popup_is-opened'
        this._popupCloseSelector = '.popup__close'
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.classList.add(this._popupIsOpenedSelector)
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.classList.remove(this._popupIsOpenedSelector)
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector(this._popupCloseSelector);
        closeButton.addEventListener('click', this.close.bind(this))
        this._popup.addEventListener('click', this._closePopupByClickOnOverlay.bind(this));
    }

    _handleEscClose(evt) {
        if(evt.key === "Escape") {
            this.close()
        }
    }
    
    _closePopupByClickOnOverlay(event) {
        if (event.target != event.currentTarget) {
            return
        }
        this.close();
    }
}