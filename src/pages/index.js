import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {cardConfig, validationConfig} from '../utils/config.js';

const profileNameSelector = '.profile__name'
const profileDescriptionElement = '.profile__description'
const profileAvatar = '.profile__avatar'
const photoPreviewSelector = document.querySelector('.popup_photo-preview')
const popupAddCardElement = document.querySelector('.popup_add-card');
const popupEditElement = document.querySelector('.popup_edit-profile');
const popupEditAvatarElement = document.querySelector('.popup_update-avatar');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button')
const confirmCardRemovingPopupElement = document.querySelector('.popup-confirm');
const editAvatarButton = document.querySelector('.profile__edit-avatar-button')


const  api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: '30d70770-772a-4d02-94ec-a55a1bdcb3a5',
        'Content-Type': 'application/json'}
    });

    const userInfo = new UserInfo(
        {
            nameSelector: profileNameSelector,
            aboutSelector: profileDescriptionElement,
            avatarSelector: profileAvatar,
        });

    api.getUserInfo().then((data) => {
        userInfo.renderUserInfo(data)
    });

    editAvatarButton.addEventListener("click", () => {
        validatorEditAvatarPopup.disableSubmitButton()
        editAvatarPopup.open()
    })
    editProfileButton.addEventListener("click", () => {
        editUserInfoPopup.open()
        editUserInfoPopup.setInputValue(userInfo.getUserInfo())
    })  
    addCardButton.addEventListener("click", () => {
        validatorAddCardPopup.disableSubmitButton()
        addCardPopup.open()
    })

    const photoPreview = new PopupWithImage(photoPreviewSelector)
    photoPreview.setEventListeners();

    function getCardItem(cardData) {
        const card = new Card(cardData, cardConfig, 
            {
                handleCardClick: () => {
                    photoPreview.open(cardData)
                },
                handleRemoveClick: () => {
                    const confirmCardRemovingPopup = new PopupWithForm(
                        confirmCardRemovingPopupElement,
                        (event) => {
                            event.preventDefault();
                            api.deleteCard(cardData._id)
                            card.removeCard();
                            confirmCardRemovingPopup.close();
                        }
                    );
                    confirmCardRemovingPopup.setEventListeners();
                    confirmCardRemovingPopup.open();
                },
                handleSetLike: () => {
                    api.setLike(cardData._id).then((len) => {
                        card.setLikesNumber(len)
                    })
                },
                handleRemoveLike: () => {
                    api.removeLike(cardData._id).then((len) => {
                        card.setLikesNumber(len)
                    })
                }
            },);
        return card
    }

    const cardList = new Section({ 
        renderer: (item) => {
            const card = getCardItem(item);
            cardList.addItem(card.renderCard(userInfo.getUserId()));
        }
    }, cardConfig.cardList);
    
    
    api.getInitialCards().then((cardsData) => {
        cardList.renderItems(cardsData);
    });
        
    const editAvatarPopup = new PopupWithForm(
        popupEditAvatarElement,
        (event) => {
            event.preventDefault();
            editAvatarPopup.renderLoading(true)
            const inputValues = editAvatarPopup.getInputValues();

            api.updateAvatar(inputValues).finally(() => {
                editAvatarPopup.renderLoading(false)
            })
            userInfo.setUserAvatar(inputValues)
            userInfo.renderUserAvatar();
            editAvatarPopup.close();
        });
    
        const validatorEditAvatarPopup = new FormValidator(validationConfig, popupEditAvatarElement.querySelector(validationConfig.formSelector))
        validatorEditAvatarPopup.enableValidation()
    

        const addCardPopup = new PopupWithForm(
        popupAddCardElement,
        (event) => {
            event.preventDefault();
            addCardPopup.renderLoading(true)
            const cardData = addCardPopup.getInputValues();
            
            api.addCard(cardData).then((data) => {
                const card = getCardItem(data);
                cardList.addItem(card.renderCard(data.owner._id));
            }).finally(() => {
                addCardPopup.renderLoading(false)
                addCardPopup.close();
         })
    });
    const validatorAddCardPopup = new FormValidator(validationConfig, popupAddCardElement.querySelector(validationConfig.formSelector))
    validatorAddCardPopup.enableValidation()

    const editUserInfoPopup = new PopupWithForm(
        popupEditElement,
        (event) => {
            event.preventDefault();
            editUserInfoPopup.renderLoading(true)
            const inputValues = editUserInfoPopup.getInputValues();
            userInfo.setUserName(inputValues);
            userInfo.setUserAbout(inputValues);
            userInfo.renderUserNameAndAbout();
            api.editUserInfo(inputValues).finally(()=>{
                editUserInfoPopup.renderLoading(false)
                editUserInfoPopup.close();
            })
        });
    const validatorEditUserInfoPopup = new FormValidator(validationConfig, popupEditElement.querySelector(validationConfig.formSelector))
    validatorEditUserInfoPopup.enableValidation()



    addCardPopup.setEventListeners();
    editUserInfoPopup.setEventListeners();
    editAvatarPopup.setEventListeners();

