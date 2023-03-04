import * as api from  "./api.js"
import {profileName, profileText, firstProfileFieldPopup, secondProfileFieldPopup, popupProfileInfoChange, popupCardsSaveBtn, 
    firstCardsFieldPopup as firstfield, secondCardsFieldPopup as secondfield, imgPopupImage, imgPopupTitle, popupProfileAvatar, popupProfileSaveBtn,
    firstProfileAvatarFieldPopup, popupProfileAvatarBtnSend, profileAvatarIcon} from "../index.js"
import {insertCardData} from "./card.js"
export const popups = document.querySelectorAll('.popup')
//Закрытие попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

//Открыте попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); 
}

//Закрытие на Esc
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup)
    }
}

//Функция открытия попапа профиля
export function openProfilePopup(){
    firstProfileFieldPopup.value = profileName.textContent
    secondProfileFieldPopup.value = profileText.textContent
    popupProfileInfoChange.querySelectorAll('.popup__field').forEach(function (elem){
        elem.classList.remove('popup__field_type_error');
        popupProfileInfoChange.querySelector(`#${elem.id}-error`).textContent = null
    });
    openPopup(popupProfileInfoChange)
}

//Функция открытия попапа карточек
export function openCardPopup(){
    openPopup(popupCards)
}

//Функция открытия попапа картинки
export function openFullSizeImg(title, img) {
    imgPopupImage.src = img
    imgPopupImage.alt = "Картинка " + title
    imgPopupTitle.textContent = title 
    openPopup(imgPopup)
}

//Функция открытия попапа аватара
export function openAvatarPopup(){
    firstProfileAvatarFieldPopup.value = null
    openPopup(popupProfileAvatar)
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-btn-cover')) {
            closePopup(popup)
        }
    })
})