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

let currentIndex = initialCards.length;
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
const previewPhotophoto = photoPreviewPopup.querySelector('.popup__preview-photo');
const previewSubtitle = photoPreviewPopup.querySelector('.popup__preview-subtitle');

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
const closeEditPopup = function() { 
    closePopup(closeEditPopupButton) 
}

function openAddPopup() {
    openPopup(addCardPopup);
}

function openPhotoPreview(event) {
    index = event.target.parentNode.dataset.id;
    setDataForPhotoPreview(initialCards[index]);
    openPopup(photoPreviewPopup);
}

function openPopup(item) {
    document.addEventListener('keydown', escButtonHandler(item));
    item.classList.add('popup_is-opened') 
}

function closePopup(item) {
    item.classList.remove('popup_is-opened')
}

function escButtonHandler(item) {
    return function closePopupByEsc(evt) {
        if(evt.key === "Escape") {
            item.classList.remove('popup_is-opened')
            document.removeEventListener('keydown', closePopupByEsc);
        }
    }
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
}

function createCard(initialCard, index) {
    const cardTamplate = document.querySelector('#card-item').content;
    const cardItem = cardTamplate.cloneNode(true);
    const cardRemoveButton = cardItem.querySelector('.cards__remove-button');
    const cardLikeButton = cardItem.querySelector('.cards__like');
    const cardPhoto = cardItem.querySelector('.cards__photo');

    cardItem.querySelector('.cards__item').setAttribute("data-id", index);
    initialCards[index] =  initialCard;
    cardPhoto.setAttribute("src", initialCard.link);
    cardPhoto.setAttribute("alt", initialCard.name);
    cardItem.querySelector('.cards__title').textContent = initialCard.name;

    cardRemoveButton.addEventListener("click", removeCard);
    cardLikeButton.addEventListener('click', likeCard);
    cardPhoto.addEventListener('click', openPhotoPreview);

    return cardItem;
}

function renderCard(initialCard, index) {
    item = createCard(initialCard, index);
    cards.prepend(item);
}

function resetCards() {
    cards.innerHTML = "";
    cardNameInput.value = "";
    cardLinkInput.value = "";
}

function removeCard(event) {
    card = event.target.parentNode;
    card.remove();
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
    renderCard(cardItem, currentIndex);
    closePopup(addCardPopup);
    currentIndex++;
}


function setDataForPhotoPreview(data) {
    previewPhotophoto.src = data.link;
    previewPhotophoto.alt = data.name;
    previewSubtitle.textContent = data.name;
}

setListenersForEditProfilePopup();
setListenersForAddCardPopup();
setListenersForPhotoPreview();
renderCards();