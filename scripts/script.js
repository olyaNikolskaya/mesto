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
const closePopupButton = editProfilePopup.querySelector('.popup__close')
const editProfileForm = editProfilePopup.querySelector('.popup__form')
const editProfileButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const saveProfileButton = editProfilePopup.querySelector('.popup__save-button')
const nameInput = editProfilePopup.querySelector('.popup__field_input-name')
const descriptionInput = editProfilePopup.querySelector('.popup__field_input-description')

function openEditPopup() {
    nameInput.value = profileName.textContent
    descriptionInput.value = profileDescription.textContent
    editProfilePopup.classList.add('popup_is-opened')
}

function closeEditProfilePopup() {
    editProfilePopup.classList.remove('popup_is-opened')
}

function closePopupByClickOnOverlay(event) {
    if (event.target != event.currentTarget) {
        return
    }
    closeEditProfilePopup()
}

function formSubmitHandler(event) {
    event.preventDefault()

    let name = nameInput.value
    let job = descriptionInput.value

    profileName.textContent = name
    profileDescription.textContent = job

    closeEditProfilePopup()
}

function setListenersForEditProfilePopup() {
    editProfileButton.addEventListener('click', openEditPopup)
    closePopupButton.addEventListener('click', closeEditProfilePopup)
    editProfilePopup.addEventListener('click', closePopupByClickOnOverlay)
    editProfileForm.addEventListener('submit', formSubmitHandler)
}


const cards = document.querySelector('.cards');
const addCardPopup = document.querySelector('.popup_add-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardButton = document.querySelector('.profile__add-button');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close');
const cardNameInput = addCardPopup.querySelector('.popup__field-input-card-name');
const cardLinkInput = addCardPopup.querySelector('.popup__field-input-card-link');

function render() {
    reset();
    initialCards.forEach(renderCard);
}

function reset() {
    cards.innerHTML = "";
    cardNameInput.value = "";
    cardLinkInput.value = "";
}

function renderCard(initialCard) {
    const cardTamplate = document.querySelector('#card-item').content;
    const cardItem = cardTamplate.cloneNode(true);

    cardItem.querySelector('.cards__photo').setAttribute("src", initialCard.link);
    cardItem.querySelector('.cards__photo').setAttribute("alt", initialCard.name);
    cardItem.querySelector('.cards__title').textContent = initialCard.name;

    cards.append(cardItem);
}

function handleCreateCardSubmite(event) {
    event.preventDefault();
    let cardItem = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    
    initialCards.unshift(cardItem);
    render();

    closeAddCardPopup(addCardPopup);
}

function openAddCardPopup() {
    addCardPopup.classList.add('popup_is-opened');
}

const closeAddCardPopup = function () {
    addCardPopup.classList.remove('popup_is-opened')
}

const closeAddCardPopupByClickOnOverlay = function (event) {
    if (event.target != event.currentTarget) {
        return
    }
    closeAddCardPopup();
}

function setListenersForAddCardPopup() {
    addCardButton.addEventListener('click', openAddCardPopup);
    addCardPopup.addEventListener('click', closeAddCardPopupByClickOnOverlay);
    closeAddCardPopupButton.addEventListener('click', closeAddCardPopup);
    addCardForm.addEventListener('submit', handleCreateCardSubmite);
}

const removeButtonForCard = document.querySelectorAll('.cards__remove-button');
const likeButton = document.querySelectorAll('.cards__like');

function removeCard() {

}

function likeCard(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('cards__like_active');
}

function setListenersForCard() {
    removeButtonForCard.forEach((btn) => {
        btn.addEventListener('click', removeCard);
    });

    likeButton.forEach((btn => {
        btn.addEventListener('click', likeCard)
    }))
}

setListenersForEditProfilePopup();

render();
setListenersForAddCardPopup();
setListenersForCard();