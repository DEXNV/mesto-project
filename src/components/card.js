import * as utils from "./utils.js"
import {popupCardsInfoChange as popupCards, firstCardsFieldPopup as firstfield, secondCardsFieldPopup as secondfield, elementsCards, imgPopupImage, imgPopupTitle} from "../index.js"
import {openFullSizeImg} from "./modal.js"

//Функция создания экземпляра карточки
export function getCard() {
    const template = document.querySelector('#cardTemplate').content

    const cardContainer = template.querySelector('.elements__element').cloneNode(true)

    return cardContainer
}

//Функция создания карточки
export function insertCardData(cardName, cardLink) {
    const card = getCard()

    const cardImage = card.querySelector('.elements__image')
    cardImage.src = cardLink
    cardImage.alt = "Картинка " + cardName

    const cardTrash = card.querySelector('.elements__trash')

    card.querySelector('.elements__title').textContent = cardName

    const cardLike = card.querySelector('.elements__like-btn')

    cardLike.addEventListener('click', function (evt) {evt.target.classList.toggle('elements__like-btn_active');});

    cardImage.addEventListener('click', function () {openFullSizeImg(cardImage.alt, cardImage.src)});

    cardTrash.addEventListener('click', () => card.remove())

    
    return card
}

//Функция добавления карточек в DOM
export function insertInitialCards(mas, elementsCards) {
    
    for (let i = 0; i !== mas.length; i++)
    {
        elementsCards.prepend(insertCardData(mas[i].name, mas[i].link)); 
    }
}