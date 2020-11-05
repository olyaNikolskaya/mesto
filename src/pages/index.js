import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, cardConfig, validationConfig} from '../utils/config.js';

const profileNameSelector = '.profile__name'
const profileDescriptionElement = '.profile__description'
const photoPreviewSelector = document.querySelector('.popup_photo-preview')
const popupAddCardElement = document.querySelector('.popup_add-card');
const popupEditElement = document.querySelector('.popup_edit-profile');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button')

const photoPreview = new PopupWithImage(photoPreviewSelector)
photoPreview.setEventListeners();

function getCardItem(item) {
    const card = new Card(item, cardConfig, 
        () => {
            photoPreview.open(item)
        });
    return card
}

const cardList = new Section({ 
    renderer: (item) => {
        const card = getCardItem(item);
        cardList.addItem(card.getCardItem());
    }
}, cardConfig.cardlist);
cardList.renderItems(initialCards);

const validator = new FormValidator(validationConfig)

const addCardPopup = new PopupWithForm(
    popupAddCardElement,
    (event) => {
        event.preventDefault();
        const cardData = addCardPopup.getInputValues();
        const card = getCardItem(cardData);
        cardList.addItem(card.getCardItem());
        addCardPopup.close();
    });
validator.enableValidation(popupAddCardElement.querySelector(validationConfig.formSelector))

const userInfo = new UserInfo({
    userNameSelector: profileNameSelector,
    userDescriptionSelector: profileDescriptionElement,
})

const editUserInfoPopup = new PopupWithForm(
    popupEditElement,
    (event) => {
        event.preventDefault();
        const inputValues = editUserInfoPopup.getInputValues();
        userInfo.setUserInfo(inputValues)
        editUserInfoPopup.close();
    });
validator.enableValidation(popupEditElement.querySelector(validationConfig.formSelector))

editProfileButton.addEventListener("click", () => {
    editUserInfoPopup.open()
    editUserInfoPopup.setInputValue(userInfo.getUserInfo())
})  
addCardButton.addEventListener("click", () => {
    addCardPopup.disableSubmitButton()
    addCardPopup.open()
})

addCardPopup.setEventListeners();
editUserInfoPopup.setEventListeners();

