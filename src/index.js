import { enableValidation } from "./components/validate.js"
import './pages/index.css';
import * as utils from "./components/utils.js"
import * as modal from "./components/modal.js"
import * as api from "./components/api.js"
import * as card from "./components/card.js"

//Профиль
const profileInfoBtn = document.querySelector('.profile-info__edit-button')
export const profileName = document.querySelector('.profile-info__username')
export const profileText = document.querySelector('.profile-info__usertext')
const profileAvatar = document.querySelector('.profile__avatar')
export const profileAvatarIcon = document.querySelector('.profile__avatar-icon')
const profileEditAvatar = document.querySelector('.profile__avatar-edit')
export let profileId 

//Попапы
const popupsContainerFields = document.querySelectorAll('.popup__form-edit-profile')

//Попап профиля
export const popupProfileInfoChange = document.querySelector('#popupProfile')
export const popupProfileSaveBtn = popupProfileInfoChange.querySelector('.popup__send-btn')
const popupProfileCloseBtn = popupProfileInfoChange.querySelector('.popup__close-btn')
export const firstProfileFieldPopup = popupProfileInfoChange.querySelector('#firstFieldPopup')
export const secondProfileFieldPopup = popupProfileInfoChange.querySelector('#secondFieldPopup')
firstProfileFieldPopup.value = profileName.textContent
secondProfileFieldPopup.value = profileText.textContent

//Попап аватара
export const popupProfileAvatar = document.querySelector('#popupProfileAvatar')
const popupAvatarInfoChange = popupProfileAvatar.querySelector('.popup__form-edit-profile')
export const popupProfileAvatarBtn = popupAvatarInfoChange.querySelector('.popup__close-avatar-btn')
export const firstProfileAvatarFieldPopup = popupAvatarInfoChange.querySelector('#firstFieldPopup')
export const popupProfileAvatarBtnSend = popupAvatarInfoChange.querySelector('.popup__send-btn')

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

//Модальное окно карточек
const imgPopup = document.querySelector('#imgPopup')
const imgPopupContainer = imgPopup.querySelector('.popup-img__container')
const imgPopupCloseBtn = imgPopup.querySelector('.popup__img-close-btn')
export const imgPopupImage = imgPopup.querySelector('.popup__image')
export const imgPopupTitle = imgPopup.querySelector('.popup__img-title')

//Мониторинг

Promise.all([api.getMeFromServer(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    profileId = userInfo._id
    profileName.textContent = userInfo.name
    profileText.textContent = userInfo.about
    profileAvatarIcon.src = userInfo.avatar

    card.insertInitialCards(cards, elementsCards)
  })
  .catch(err => {console.log("Буллшит какой-то:" + err)})

//Отправка данных из попапа профиля и её закрытие
popupProfileInfoChange.addEventListener('submit', addAndCloseProfile)

//Отправка данных из попапа карточек и её закрытие
popupCardsInfoChange.addEventListener('submit', addAndCloseCard)

//Открытие попапа профиля
profileInfoBtn.addEventListener('click', modal.openProfilePopup)

//Изменение автара профиля (наведение курсора)
profileAvatar.addEventListener('mouseover', () => {
  profileEditAvatar.classList.add('profile__avatar-edit_type_hidden')
})

//Изменение автара профиля (снятие курсора)
profileAvatar.addEventListener('mouseout', () => {
  profileEditAvatar.classList.remove('profile__avatar-edit_type_hidden')
})

//Открытие попапа аватара
profileEditAvatar.addEventListener('click', modal.openAvatarPopup)

popupProfileAvatar.addEventListener('submit', addAndCloseAvatarPopup)

//Открытие попапа карточек
addCardsBtn.addEventListener('click', function() {modal.openCardPopup(popupCardsInfoChange)})

//Функция добавления и закрытия попапа профиля
export function addAndCloseProfile(evt) {
  evt.preventDefault()
  popupProfileSaveBtn.textContent = "Сохранение..."
  api.postMeOnServer(firstProfileFieldPopup.value, secondProfileFieldPopup.value)
  .then(() => {
      profileName.textContent = firstProfileFieldPopup.value;
      profileText.textContent = secondProfileFieldPopup.value;
      modal.closePopup(popupProfileInfoChange)
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() =>{
      popupProfileSaveBtn.textContent = "Сохранить"
  })
}

//Функция добавления и закрытия попапа аватара
export function addAndCloseAvatarPopup(evt){
  evt.preventDefault()
  popupProfileAvatarBtnSend.textContent = "Сохранение..."
  api.postMyNewAvatar(firstProfileAvatarFieldPopup.value)
  .then(() => {
      profileAvatarIcon.src = firstProfileAvatarFieldPopup.value
      modal.closePopup(popupProfileAvatar)
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
      popupProfileAvatarBtnSend.textContent = "Сохранить"
  })
}

//Функция добавления и закрытия попапа карточек
export function addAndCloseCard(evt) {
  evt.preventDefault()
  popupCardsSaveBtn.textContent = "Сохранение..."
  api.postCardOnServer(firstCardsFieldPopup.value, secondCardsFieldPopup.value)
  .then((data) => {
      elementsCards.append(card.insertCardData(firstCardsFieldPopup.value, secondCardsFieldPopup.value, data.likes, data.owner._id, data._id))
      modal.closePopup(popupCardsInfoChange) 
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
      popupCardsSaveBtn.setAttribute('disabled', '') 
  })
}


enableValidation({
    formSelector: '.popup',
    formContainer: '.popup__container',
    inputSelector: '.popup__field',
    inputError: 'popup__field_type_error',
    submitButtonSelector: '.popup__send-btn',
    inactiveButtonClass: 'popup__send-btn_type_disabled',
})