const editProfileButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closePopupButton = popup.querySelector('.popup__close')
const editProfileForm = popup.querySelector('.popup__form')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const saveButton = popup.querySelector('.popup__save-button')

const nameInput = popup.querySelector('.js-form__name-input')
const descriptionInput = popup.querySelector('.js-form__descriptio-input')

nameInput.setAttribute('value', profileName.textContent) 
descriptionInput.setAttribute('value', profileDescription.textContent)



const popupToggle = function () {
    popup.classList.toggle('popup_is-opened')
}

const closePopupByClickOnOverlay = function (event) {
    if (event.target != event.currentTarget) {
        return
    }
    popupToggle()
}

const formSubmitHandler = function (event) {
    event.preventDefault()

    let name = nameInput.value
    let job = descriptionInput.value

    profileName.textContent = name
    profileDescription.textContent = job

    popupToggle()
}

editProfileButton.addEventListener('click', popupToggle)
closePopupButton.addEventListener('click', popupToggle)
popup.addEventListener('click', closePopupByClickOnOverlay)
editProfileForm.addEventListener('submit', formSubmitHandler)


