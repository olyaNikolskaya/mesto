import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, cardConfig, validationConfig} from '../utils/config.js';

const profileNameSelector = '.profile__name'
const profileDescriptionSelector = '.profile__description'
const photoPreviewSelector = '.popup_photo-preview'
const popupAddCardSelector = '.popup_add-card'
const popupEditSelector = '.popup_edit-profile';
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button')

function getPopupWithImage(item) {
    const photoPreview = new PopupWithImage(photoPreviewSelector, item)
    photoPreview.setEventListeners();
    return photoPreview;
}

function getCardItem(item) {
    const photoPreview = getPopupWithImage(item);
    const card = new Card(item, cardConfig, 
        () => {
            photoPreview.open()
        });
    return card
}

function createSection(initialData) {
    const section = new Section({
        items: initialData, 
        renderer: (item) => {
            const card = getCardItem(item);
            section.addItem(card.getCardItem());
        }
    }, cardConfig.cardlist);
    section.renderItems();
}

function enableValidation(configObj){
    const formsList = Array.from(document.querySelectorAll(configObj.formSelector));
    formsList.forEach((form) => {
       const validator = new FormValidator(configObj, form)
       validator.enableValidation()
        });
}

const addCardPopup = new PopupWithForm(
    popupAddCardSelector,
    (event) => {
        event.preventDefault();
        const cardData = [addCardPopup._getInputValues()];
        createSection(cardData)
        addCardPopup.close();
    });

const userInfo = new UserInfo({
    userNameSelector: profileNameSelector,
    userDescriptionSelector: profileDescriptionSelector,
})

const editUserInfoPopup = new PopupWithForm(
    popupEditSelector,
    (event) => {
        event.preventDefault();
        const inputValues = editUserInfoPopup._getInputValues();
        userInfo.setUserInfo(inputValues)
        editUserInfoPopup.close();
    });


createSection(initialCards);
editProfileButton.addEventListener("click", () => {
    editUserInfoPopup.open()
    editUserInfoPopup.setInputValue(userInfo.getUserInfo())
})  
addCardButton.addEventListener("click", addCardPopup.open.bind(addCardPopup))
addCardPopup.setEventListeners();
editUserInfoPopup.setEventListeners();
enableValidation(validationConfig);
