import * as utils from "./utils.js"
import * as api from  "./api.js"
import {profileName, profileText, firstProfileFieldPopup, secondProfileFieldPopup, popupProfileInfoChange, popupCardsSaveBtn, 
    firstCardsFieldPopup as firstfield, secondCardsFieldPopup as secondfield, imgPopupImage, imgPopupTitle, popupProfileAvatar, popupProfileSaveBtn,
    firstProfileAvatarFieldPopup, popupProfileAvatarBtnSend} from "../index.js"
import {insertCardData} from "./card.js"

//Функция добавления и закрытия попапа профиля
export function addAndCloseProfile() {
    popupProfileSaveBtn.textContent = "Сохранение..."
    api.postMeOnServer(firstProfileFieldPopup.value, secondProfileFieldPopup.value)
    .then(() => {
        popupProfileSaveBtn.textContent = "Сохранить"
        utils.closePopup(popupProfileInfoChange)
    })
    .catch((err) => {
        console.log(err);
    }); 
}

//Функция открытия попапа профиля
export function openProfilePopup(){
    firstProfileFieldPopup.value = profileName.textContent
    secondProfileFieldPopup.value = profileText.textContent
    popupProfileInfoChange.querySelectorAll('.popup__field').forEach(function (evt){
        evt.classList.remove('popup__field_type_error');
        popupProfileInfoChange.querySelector(`#${evt.id}-error`).textContent = null
    });
    utils.openPopup(popupProfileInfoChange)
}

//Функция добавления и закрытия попапа карточек
export function addAndCloseCard(evt) {
    api.postCardOnServer(firstfield.value, secondfield.value)
    .catch((err) => {
        console.log(err);
    }); 
    utils.closePopup(popupCards) 
    popupCardsSaveBtn.setAttribute('disabled', '')
    evt.target.reset()
}

//Функция открытия попапа карточек
export function openCardPopup(){
    utils.openPopup(popupCards)
}

//Функция открытия попапа картинки
export function openFullSizeImg(title, img) {
    imgPopupImage.src = img
    imgPopupImage.alt = "Картинка " + title
    imgPopupTitle.textContent = title 
    utils.openPopup(imgPopup)
}

//Функция добавления и закрытия попапа аватара
export function addAndCloseAvatarPopup(){
    popupProfileAvatarBtnSend.textContent = "Сохранение..."
    api.postMyNewAvatar(firstProfileAvatarFieldPopup.value)
    .then(() => {
        popupProfileAvatarBtnSend.textContent = "Сохранить"
        utils.closePopup(popupProfileAvatar)
    })
    .catch((err) => {
        console.log(err);
    }); 
}

//Функция открытия попапа аватара
export function openAvatarPopup(){
    utils.openPopup(popupProfileAvatar)
}