import { enableValidation } from "./components/validate.js"
import './pages/index.css';
import * as cards from "./components/card.js"
import * as utils from "./components/utils.js"
import * as modal from "./components/modal.js"

//Профиль
const profileInfoBtn = document.querySelector('.profile-info__edit-button')
export const profileName = document.querySelector('.profile-info__username')
export const profileText = document.querySelector('.profile-info__usertext')

//Попапы
const popups = document.querySelectorAll('.popup')
const popupsContainerFields = document.querySelectorAll('.popup__form-edit-profile')

//Попап профиля
export const popupProfileInfoChange = document.querySelector('#popupProfile')
export const popupProfileSaveBtn = popupProfileInfoChange.querySelector('.popup__send-btn')
const popupProfileCloseBtn = popupProfileInfoChange.querySelector('.popup__close-btn')
export const firstProfileFieldPopup = popupProfileInfoChange.querySelector('#firstFieldPopup')
export const secondProfileFieldPopup = popupProfileInfoChange.querySelector('#secondFieldPopup')
firstProfileFieldPopup.value = profileName.textContent
secondProfileFieldPopup.value = profileText.textContent

//Попап карточек
export const popupCardsInfoChange = document.querySelector('#popupCards')
export const popupCardsSaveBtn = popupCardsInfoChange.querySelector('.popup__send-btn') 
const popupCardsCloseBtn = popupCardsInfoChange.querySelector('.popup__close-btn')
export const firstCardsFieldPopup = popupCardsInfoChange.querySelector('#firstFieldPopup')
export const secondCardsFieldPopup = popupCardsInfoChange.querySelector('#secondFieldPopup')
firstCardsFieldPopup.value = null
secondCardsFieldPopup.value = null

//Карточки 
export const elementsCards = document.querySelector('.elements')
const addCardsBtn = document.querySelector('.profile__add-button')
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

//Модальное окно карточек
const imgPopup = document.querySelector('#imgPopup')
const imgPopupContainer = imgPopup.querySelector('.popup-img__container')
const imgPopupCloseBtn = imgPopup.querySelector('.popup__img-close-btn')
export const imgPopupImage = imgPopup.querySelector('.popup__image')
export const imgPopupTitle = imgPopup.querySelector('.popup__img-title')


//Мониторинг


//Отправка данных из попапа профиля и её закрытие
popupProfileInfoChange.addEventListener('submit', modal.addAndCloseProfile)

//Отправка данных из попапа карточек и её закрытие
popupCardsInfoChange.addEventListener('submit', modal.addAndCloseCard)

//Открытие попапа профиля
profileInfoBtn.addEventListener('click', modal.openProfilePopup)


//Добавляем карточки из массива
cards.insertInitialCards(initialCards, elementsCards)


//Открытие попапа карточек
addCardsBtn.addEventListener('click', function() {
    modal.openCardPopup(popupCardsInfoChange)
})

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            utils.closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-btn-cover')) {
            utils.closePopup(popup)
        }
    })
})

enableValidation({
    formSelector: '.popup',
    formContainer: '.popup__container',
    inputSelector: '.popup__field',
    inputError: 'popup__field_type_error',
    submitButtonSelector: '.popup__send-btn',
    inactiveButtonClass: 'popup__send-btn_type_disabled',
})