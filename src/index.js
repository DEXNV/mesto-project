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

//Попап карточек
export const popupCardsInfoChange = document.querySelector('#popupCards')
const popupCardsSaveBtn = popupCardsInfoChange.querySelector('.popup__send-btn') 
const popupCardsCloseBtn = popupCardsInfoChange.querySelector('.popup__close-btn')
export const firstCardsFieldPopup = popupCardsInfoChange.querySelector('#firstFieldPopup')
export const secondCardsFieldPopup = popupCardsInfoChange.querySelector('#secondFieldPopup')

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


//Функции

function handleFormSubmit(evt) {
    evt.preventDefault(); 
}

//Мониторинг

//Отправка данных из попапа профиля и её закрытие
popupProfileInfoChange.addEventListener('submit', function (){
    modal.addAndCloseProfile()
})

//Открытие попапа профиля
profileInfoBtn.addEventListener('click', function (){
    modal.openProfilePopup()
})

//Закрытие попапа профиля
popupProfileCloseBtn.addEventListener('click', function (){
    utils.closePopup(popupProfileInfoChange)
})

//Не отправляем формы
popupProfileInfoChange.addEventListener('submit', handleFormSubmit); 

popupCardsInfoChange.addEventListener('submit', handleFormSubmit); 

//Добавляем карточки из массива
cards.cardInsert(initialCards, elementsCards)

//Закрытие попапа карточек
imgPopupCloseBtn.addEventListener('click', function (){
    utils.closePopup(imgPopup)
})

//Открытие попапа карточек
addCardsBtn.addEventListener('click', function() {
    modal.openCardPopup(popupCardsInfoChange)
    popupCardsSaveBtn.classList.add('popup__send-btn_type_disabled')
})

//Закрытие попапа карточек
popupCardsCloseBtn.addEventListener('click', function() {
    utils.closePopup(popupCardsInfoChange)
})

//Отправка данных из попапа карточек и её закрытие
popupCardsInfoChange.addEventListener('submit', function(){
    modal.addAndCloseCard()
})

//Открытие 

//Закрытие попапа картинки
imgPopupCloseBtn.addEventListener('click', function(){
    utils.closePopup(imgPopup)
})

//Закрытие попапов кликом на оверлей 
for (let i = 0; i < popups.length-1; i++){
    popups[i].addEventListener('click', function(evt){
        utils.closePopup(popups[i])

        //Отмена всплытия из контейнера 
        this.querySelector('.popup__container').addEventListener('click', function(evt){
            evt.stopPropagation();
        })
    })

    //Закрытие на Esc
    document.addEventListener('keydown', function (evt) {
        if(evt.keyCode === 27) {
            utils.closePopup(popups[i])
            utils.closePopup(imgPopup)
        }
    }, true);
}

//Отмена всплытия из контейнера картинок
imgPopupContainer.addEventListener('click', function(evt){
    evt.stopPropagation();
})

popupsContainerFields.forEach(function (evt){
    evt.addEventListener('click', function(evt){
        evt.stopPropagation();
    })
    
})

//Закрытие попапа картиок кликом на оверлей 
popups.forEach(function (evt){
    evt.addEventListener('click', function(){
        utils.closePopup(evt)
})
})

enableValidation({
    formSelector: '.popup',
    formContainer: '.popup__container',
    inputSelector: '.popup__field',
    inputError: '.popup__field_type_error',
    submitButtonSelector: '.popup__send-btn',
    inactiveButtonClass: 'popup__send-btn_type_disabled',
})