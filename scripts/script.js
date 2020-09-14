const editProfileButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closePopupButton = popup.querySelector('.popup__close')
const editProfileForm = popup.querySelector('.popup__form')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const saveButton = popup.querySelector('.popup__save-button')

const nameInput = popup.querySelector('.popup__field_input-name')
const descriptionInput = popup.querySelector('.popup__field_input-description')


const openPopup = function () {
    nameInput.value = profileName.textContent
    descriptionInput.value = profileDescription.textContent
    popup.classList.add('popup_is-opened')
}

const closePopup = function () {
    popup.classList.remove('popup_is-opened')
}

const closePopupByClickOnOverlay = function (event) {
    if (event.target != event.currentTarget) {
        return
    }
    closePopup()
}

const formSubmitHandler = function (event) {
    event.preventDefault()

    let name = nameInput.value
    let job = descriptionInput.value

    profileName.textContent = name
    profileDescription.textContent = job

    closePopup()
}


editProfileButton.addEventListener('click', openPopup)
closePopupButton.addEventListener('click', closePopup)
popup.addEventListener('click', closePopupByClickOnOverlay)
editProfileForm.addEventListener('submit', formSubmitHandler)


