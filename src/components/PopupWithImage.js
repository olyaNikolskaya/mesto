import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(data) {
        this._setDataForPhotoPreview(data);
        super.open();
    }

    _setDataForPhotoPreview(data) {
        const previewPhotophoto = this._popup.querySelector('.popup__preview-photo');
        const previewSubtitle = this._popup.querySelector('.popup__preview-subtitle');
        previewPhotophoto.alt = data.name;
        previewPhotophoto.src = data.link;
        previewSubtitle.textContent = data.name;
    }
}