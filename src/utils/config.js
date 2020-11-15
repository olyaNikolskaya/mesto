export const initialCards = [
    {
        name: 'Архыз',
        image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const cardConfig = {
    cardTemplate: document.querySelector('#card-item'),
    cardList: document.querySelector('.cards'),
    previewPhotophoto: document.querySelector('.popup__preview-photo'),
    previewSubtitle: document.querySelector('.popup__preview-subtitle'),
    cardPhotoSelector: '.cards__photo',
    cardTitleSelector: '.cards__title',
    cardLikeSelector: '.cards__like',
    cardLikesCounterSelector: '.cards__likes_count',
    cardRemoveButtonSelector: '.cards__remove-button',
    activeLikeClass: 'cards__like_active'
}

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__field-error-text',
    errorClass: 'popup__field-error-text_visible',
    popupFieldError: 'popup__field_error',
}