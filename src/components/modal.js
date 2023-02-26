import * as utils from "./utils.js"
import {profileName, profileText, firstProfileFieldPopup, secondProfileFieldPopup, popupProfileInfoChange, popupProfileSaveBtn, 
    elementsCards, firstCardsFieldPopup as firstfield, secondCardsFieldPopup as secondfield, imgPopupImage, imgPopupTitle} from "../index.js"
import {insertCardData} from "./card.js"

//Функция добавления и закрытия попапа профиля
export function addAndCloseProfile() {
    profileName.textContent = firstProfileFieldPopup.value
    profileText.textContent = secondProfileFieldPopup.value
    utils.closePopup(popupProfileInfoChange)    
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
export function addAndCloseCard() {
    elementsCards.prepend(insertCardData(firstfield.value, secondfield.value))
    firstfield.value = null
    secondfield.value = null
    utils.closePopup(popupCards) 
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