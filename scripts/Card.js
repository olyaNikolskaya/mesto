 export default class Card {
    constructor(item, config, openPopup) {
        this._name = item.name;
        this._link = item.link;
        this._config = config;
        this._openPopup = openPopup;
    }

    getCardItem() {
        this._cardItem = this._getCardTemplate();
        this._fillCardWithData();
        this._setEventListeners();
        return this._cardItem;
    }

    _getCardTemplate() {
        return this._config.cardTemplate.content.cloneNode(true).children[0];
    }
    
    _fillCardWithData() {
        const cardPhoto = this._cardItem.querySelector(this._config.cardPhotoSelector);
        const cardTitle = this._cardItem.querySelector(this._config.cardTitleSelector);
        cardPhoto.src = this._link;
        cardPhoto.alt = this._name;
        cardTitle.textContent = this._name;
    }

    _setEventListeners() {
        this._cardItem.querySelector(this._config.cardRemoveButtonSelector).addEventListener('click', () => this._removeCard());
        this._cardItem.querySelector(this._config.cardLikeSelector).addEventListener('click', () => this._likeCard());
        this._cardItem.querySelector(this._config.cardPhotoSelector).addEventListener('click', () => this._openPhotoPreview());
    }

    _removeCard() {
        this._cardItem.remove();
    }

    _likeCard() {
        this._cardItem.querySelector(this._config.cardLikeSelector).classList.toggle(this._config.activeLikeClass);
    }

    _openPhotoPreview() {
        this._setDataForPhotoPreview();
        this._openPopup(this._cardItem);
    }

    _setDataForPhotoPreview() {
        this._config.previewPhotophoto.src = this._link;
        this._config.previewPhotophoto.alt = this._name;
        this._config.previewSubtitle.textContent = this._name;
    }
}
