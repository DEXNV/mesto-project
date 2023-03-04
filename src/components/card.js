import {openFullSizeImg} from "./modal.js"
import {profileId} from "../index.js"
import {removeCardFromServer, putLikeOnCard, removeLikeFromCard} from "./api.js"

//Функция создания экземпляра карточки
export function getCard() {
    const template = document.querySelector('#cardTemplate').content

    const cardContainer = template.querySelector('.elements__element').cloneNode(true)

    return cardContainer
}

//Функция создания карточки
export function insertCardData(cardName, cardLink, likes, owner, cardId) {
    let liked = false
    const card = getCard()
    const cardImage = card.querySelector('.elements__image')
    cardImage.src = cardLink
    cardImage.alt = "Картинка " + cardName

    const cardTrash = card.querySelector('.elements__trash')

    if(profileId !== owner) cardTrash.style.display = "none"

    card.querySelector('.elements__title').textContent = cardName

    const cardLike = card.querySelector('.elements__like-btn')

    likes.forEach((elem) => {
        if (elem._id === profileId) 
        {
            cardLike.classList.add('elements__like-btn_active')
            liked = true
        }
    })

    const cardNum = card.querySelector('.elements__like-num')

    cardNum.textContent = likes.length

    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like-btn_active'); 
        if(liked)
        {
            removeLikeFromCard(cardId)
        }
        else
        {
            putLikeOnCard(cardId)
        }
    });

    cardImage.addEventListener('click', function () {openFullSizeImg(cardImage.alt, cardImage.src)});

    cardTrash.addEventListener('click', () => removeCardFromServer(cardId))

    
    return card
}

//Функция добавления карточек в DOM
export function insertInitialCards(mas, elementsCards) {
    
    for (let i = 0; i !== mas.length; i++)
    {
        elementsCards.prepend(insertCardData(mas[i].name, mas[i].link, mas[i].likes, mas[i].owner._id, mas[i]._id)); 
    }
}