const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editProfilePopup = document.querySelector('.popup_edit-profile')
const closeEditPopupButton = editProfilePopup.querySelector('.popup__close')
const editProfileForm = editProfilePopup.querySelector('.popup__form')
const editProfileButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const saveProfileButton = editProfilePopup.querySelector('.popup__save-button')
const nameInput = editProfilePopup.querySelector('.popup__field_input-name')
const descriptionInput = editProfilePopup.querySelector('.popup__field_input-description')

const cards = document.querySelector('.cards');
const addCardPopup = document.querySelector('.popup_add-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardButton = document.querySelector('.profile__add-button');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close');
const cardNameInput = addCardPopup.querySelector('.popup__field-input-card-name');
const cardLinkInput = addCardPopup.querySelector('.popup__field-input-card-link');

const photoPreviewPopup = document.querySelector('.popup_photo-preview');
const closePhotoPreviewButton = photoPreviewPopup.querySelector('.popup__close');

function setListenersForEditProfilePopup() {
    editProfileButton.addEventListener("click", openEditPopup)
    closeEditPopupButton.addEventListener("click", () => closePopup(editProfilePopup))
    editProfilePopup.addEventListener('click', closePopupByClickOnOverlay(editProfilePopup))
    editProfileForm.addEventListener('submit', handelSubmitProfileInfo)
}

function setListenersForAddCardPopup() {
    addCardButton.addEventListener("click", () => openPopup(addCardPopup));
    addCardPopup.addEventListener('click', closePopupByClickOnOverlay(addCardPopup));
    closeAddCardPopupButton.addEventListener("click", () => closePopup(addCardPopup));
    addCardForm.addEventListener('submit', handelCreateCardSubmit);
}

function setListenersForCard() {
    document.querySelectorAll('.cards__remove-button').forEach((btn) => {
        btn.addEventListener("click", removeCard);
    });
    document.querySelectorAll('.cards__like').forEach((btn) => {
        btn.addEventListener("click", likeCard);
    });    
    document.querySelectorAll('.cards__photo').forEach((item) => {
        item.addEventListener('click', openPhotoPreview);
    });
}

function setListenersForPhotoPreview() {
    document.querySelectorAll('.cards__photo').forEach((btn) => {
        btn.addEventListener("click", openPhotoPreview);
    });
    photoPreviewPopup.addEventListener('click', closePopupByClickOnOverlay(photoPreviewPopup));
    closePhotoPreviewButton.addEventListener('click', () => closePopup(photoPreviewPopup));
  
}

const openEditPopup = function openEditPopup() {
    fillProfileInfoInPopupFields()
    openPopup(editProfilePopup)
}
const closeEditPopup = function() { 
    closePopup(closeEditPopupButton) 
}

const openPhotoPreview = function (event) {
    index = event.target.parentNode.dataset.id;
    setDataForPhotoPreview(index);
    openPopup(photoPreviewPopup)
}

function openPopup(item) {
    item.classList.add('popup_is-opened')  
}

function closePopup(item) {
    item.classList.remove('popup_is-opened')
}

function closePopupByClickOnOverlay(item, className) {
    return function (event) {
        if (event.target != event.currentTarget) {
            return
        }
        closePopup(item, className);
    }
}

function fillProfileInfoInPopupFields() {
    nameInput.value = profileName.textContent
    descriptionInput.value = profileDescription.textContent
}

function handelSubmitProfileInfo(event) {
    event.preventDefault()
    let name = nameInput.value;
    let job = descriptionInput.value;

    profileName.textContent = name;
    profileDescription.textContent = job;

    closePopup(editProfilePopup);
}


function renderCards() {
    resetCards();
    initialCards.forEach(renderCard);
    setListenersForCard();
}

function renderCard(initialCard, index) {
    const cardTamplate = document.querySelector('#card-item').content;
    const cardItem = cardTamplate.cloneNode(true);

    cardItem.querySelector('.cards__item').setAttribute("data-id", index);
    cardItem.querySelector('.cards__photo').setAttribute("src", initialCard.link);
    cardItem.querySelector('.cards__photo').setAttribute("alt", initialCard.name);
    cardItem.querySelector('.cards__title').textContent = initialCard.name;

    cards.append(cardItem);
}

function resetCards() {
    cards.innerHTML = "";
    cardNameInput.value = "";
    cardLinkInput.value = "";
}

function removeCard(event) {
    index = event.target.parentNode.dataset.id;
    initialCards.splice(index, 1);
    renderCards();
}

function likeCard(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('cards__like_active');
}

function handelCreateCardSubmit(event) {
    event.preventDefault();
    let cardItem = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    initialCards.unshift(cardItem);
    renderCards();
    closePopup(addCardPopup);
}


function setDataForPhotoPreview(index) {
    photoPreviewPopup.querySelector('.popup__preview-photo').setAttribute("src", initialCards[index].link);
    photoPreviewPopup.querySelector('.popup__preview-subtitle').textContent = initialCards[index].name;
}

setListenersForEditProfilePopup();
setListenersForAddCardPopup();
setListenersForPhotoPreview();
renderCards();