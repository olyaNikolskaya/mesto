import Card from './Card.js';
import FormValidator from './FormValidator.js'
import {initialCards, config, validationConfig} from './config.js';

const editProfilePopup = document.querySelector('.popup_edit-profile')
const closeEditPopupButton = editProfilePopup.querySelector('.popup__close')
const editProfileForm = editProfilePopup.querySelector('.popup__form')
const editProfileButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const nameInput = editProfilePopup.querySelector('.popup__field_input-name')
const descriptionInput = editProfilePopup.querySelector('.popup__field_input-description')

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
    editProfilePopup.addEventListener('click', closePopupByClickOnOverlay(editProfilePopup));
    closeEditPopupButton.addEventListener("click", () => closePopup(editProfilePopup))
    editProfileForm.addEventListener('submit', handelSubmitProfileInfo)
}

function setListenersForAddCardPopup() {
    addCardButton.addEventListener("click", openAddPopup);
    addCardPopup.addEventListener('click', closePopupByClickOnOverlay(addCardPopup));
    closeAddCardPopupButton.addEventListener("click", () => closePopup(addCardPopup));
    addCardForm.addEventListener('submit', handelCreateCardSubmit);
}

function setListenersForPhotoPreview() {
    photoPreviewPopup.addEventListener('click', closePopupByClickOnOverlay(photoPreviewPopup));
    closePhotoPreviewButton.addEventListener('click', () => closePopup(photoPreviewPopup));
}

const openEditPopup = function openEditPopup() {
    fillProfileInfoInPopupFields()
    openPopup(editProfilePopup)
}

function openAddPopup() {
    openPopup(addCardPopup);
}

function openPopup(item) {
    document.addEventListener('keydown', escButtonHandler);
    item.classList.add('popup_is-opened') 
}

function closePopup(item) {
    document.removeEventListener('keydown', escButtonHandler);
    item.classList.remove('popup_is-opened')
}

function escButtonHandler(evt) {
    if(evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup)
    }
}

function closePopupByClickOnOverlay(item) {
    return function (event) {
        if (event.target != event.currentTarget) {
            return
        }
        closePopup(item);
    }
}

function fillProfileInfoInPopupFields() {
    nameInput.value = profileName.textContent
    descriptionInput.value = profileDescription.textContent
}

function handelSubmitProfileInfo(event) {
    event.preventDefault()
    const name = nameInput.value;
    const job = descriptionInput.value;

    profileName.textContent = name;
    profileDescription.textContent = job;

    closePopup(editProfilePopup);
}

function openPhotoPreviewPopup() {
    openPopup(photoPreviewPopup);
}

function createCard(item) {
    const card = new Card(item, config, openPhotoPreviewPopup);
    const cardItem = card.getCardItem();
    config.cardlist.prepend(cardItem);
}

function handelCreateCardSubmit(event) {
    event.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    createCard(cardData)
    closePopup(addCardPopup);
}


function renderCards() {
    initialCards.forEach((item) => {
        createCard(item)
 })
}

function enableValidation(configObj){
    const formsList = Array.from(document.querySelectorAll(configObj.formSelector));
    formsList.forEach((form) => {
       const validator = new FormValidator(configObj, form)
       validator.enableValidation()
        });
}

enableValidation(validationConfig);

setListenersForEditProfilePopup();
setListenersForAddCardPopup();
setListenersForPhotoPreview();
renderCards();