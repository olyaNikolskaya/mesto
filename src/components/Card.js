 export default class Card {
    constructor(
        {likes, _id, name, link, owner},
        {cardPhotoSelector, cardTitleSelector, cardLikeSelector, cardLikesCounterSelector, cardRemoveButtonSelector
            , cardTemplate, activeLikeClass}, 
        {handleCardClick, handleRemoveClick, handleSetLike, handleRemoveLike}
        ) {
            this._likesList = likes;
            this._cardId = _id
            this._name = name;
            this._link = link;
            this._ownerId = owner._id
            this._cardItem = cardTemplate.content.cloneNode(true).querySelector('.cards__item');
            this._likesNumber = this._likesList.length

            this._cardPhoto = this._cardItem.querySelector(cardPhotoSelector);
            this._cardTitle = this._cardItem.querySelector(cardTitleSelector);
            this._cardRemoveButton = this._cardItem.querySelector(cardRemoveButtonSelector);
            this._cardLike = this._cardItem.querySelector(cardLikeSelector);
            this._cardLikesConter = this._cardItem.querySelector(cardLikesCounterSelector);

            this._handleCardClick = handleCardClick;
            this._handleRemoveClick = handleRemoveClick;
            this._handleSetLike = handleSetLike;
            this._handleRemoveLike = handleRemoveLike;

            this._activeLikeClass = activeLikeClass
    }

    getCardInfo() {
        const cardInfo = {}
        cardInfo.likes = this._likesList;
        
        cardInfo.id = this._cardId;
        cardInfo.name = this._name;
        cardInfo.link = this._link;
        cardInfo.ownerId = this._ownerId
        return cardInfo
    }

    setLikesNumber(number) {
        this._likesNumber = number
    }

    removeCard() {
        this._cardItem.remove();
    }

    renderCard(userId) {
        this._cardPhoto.src = this._link;
        this._cardPhoto.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._cardLikesConter.textContent = this._likesNumber;

        const number = this._countLikesByUser(userId)
        if(number > 0) {
            this._toggleLike()
        }

        if(this._ownerId !== userId) {
            this._cardRemoveButton.classList.add('cards__remove-button_hidden');
        }
        this._setEventListeners();
        return this._cardItem
    }

    _countLikesByUser(userId) {
        return this._likesList.filter(item => item._id === userId).length
    }

    _setEventListeners() {
        this._cardRemoveButton.addEventListener('click', () => this._handleRemoveClick());
        this._cardLike.addEventListener('click', () => this._likeCard());
        this._cardPhoto.addEventListener('click', () => this._handleCardClick());
    }

    _likeCard() {
        if (this._cardLike.classList.contains(this._activeLikeClass)){
            this._cardLikesConter.textContent = this._likesNumber - 1
            this._handleRemoveLike()
        } else {
            this._cardLikesConter.textContent = this._likesNumber + 1
            this._handleSetLike()
        }
        this._toggleLike()
    }

    _toggleLike() {
        this._cardLike.classList.toggle(this._activeLikeClass);
    }
}