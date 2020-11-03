import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    
    constructor(popupSelector, data) {
        super(popupSelector);
        this._name = data.name;
        this._image = data.image;
    }

    open() {
        this._setDataForPhotoPreview();
        super.open();
    }

    _setDataForPhotoPreview() {
        const previewPhotophoto = this._popup.querySelector('.popup__preview-photo');
        const previewSubtitle = this._popup.querySelector('.popup__preview-subtitle');

        previewPhotophoto.alt = this._name;
        previewPhotophoto.src = this._image;
        previewSubtitle.textContent = this._name;
    }
}