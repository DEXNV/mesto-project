import * as utils from "./utils.js"
import {popupCardsInfoChange as popupCards, firstCardsFieldPopup as firstfield, secondCardsFieldPopup as secondfield, elementsCards, imgPopupImage, imgPopupTitle} from "../index.js"
import {fullSizeImg} from "./modal.js"
//Функция создания экземпляра карточки
export function addExemplCard() {
    const template = document.querySelector('#cardTemplate').content

    const cardContainer = template.querySelector('.elements__element').cloneNode(true)

    return cardContainer
}

//Функция создания карточки
export function cardInsertData(cardName, cardLink) {
    const card = addExemplCard()

    const cardImage = card.querySelector('.elements__image')
    cardImage.src = cardLink
    cardImage.alt = cardName

    const cardTrash = card.querySelector('.elements__trash')

    card.querySelector('.elements__title').textContent = cardName

    const cardLike = card.querySelector('.elements__like-btn')

    cardLike.addEventListener('click', function (evt) {evt.target.classList.toggle('elements__like-btn_active');});

    cardImage.addEventListener('click', function () {fullSizeImg(cardImage.alt, cardImage.src)});

    cardTrash.addEventListener('click', function () {this.parentElement.remove()})

    
    return card
}

//Функция добавления карточек в DOM
export function cardInsert(mas, elementsCards) {
    
    for (let i = 0; i !== mas.length; i++)
    {
        elementsCards.prepend(cardInsertData(mas[i].name, mas[i].link)); 
    }
}