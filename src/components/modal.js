import * as utils from "./utils.js"
import {profileName, profileText, firstProfileFieldPopup, secondProfileFieldPopup, popupProfileInfoChange, popupProfileSaveBtn, 
    elementsCards, firstCardsFieldPopup as firstfield, secondCardsFieldPopup as secondfield, imgPopupImage, imgPopupTitle} from "../index.js"
import {cardInsertData} from "./card.js"

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
    popupProfileSaveBtn.classList.remove('popup__send-btn_type_disabled')
    utils.openPopup(popupProfileInfoChange)
}

//Функция добавления и закрытия попапа карточек
export function addAndCloseCard() {
    elementsCards.prepend(cardInsertData(firstfield.value, secondfield.value))
    utils.closePopup(popupCards) 
}

//Функция открытия попапа карточек
export function openCardPopup(){
    firstfield.value = null
    secondfield.value = null
    utils.openPopup(popupCards)
}

//Функция открытия попапа картинки
export function fullSizeImg(title, img) {
    imgPopupImage.src = img
    imgPopupTitle.textContent = title 
    utils.openPopup(imgPopup)
}