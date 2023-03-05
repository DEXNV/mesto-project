import {profileId, openFullSizeImg} from "../index.js"
import {removeCardFromServer, putLikeOnCard, removeLikeFromCard} from "./api.js"

const template = document.querySelector('#cardTemplate').content

//Функция создания экземпляра карточки
export function getCard() {
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

    if(profileId !== owner) cardTrash.classList.add("elements__trash_type_hidden")

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
        if(liked)
        {
            removeLikeFromCard(cardId)
            .then((data) => {
                evt.target.classList.toggle('elements__like-btn_active'); 
                cardNum.textContent = data.likes.length
                liked = false
            })
            .catch((err) => {
                console.log("Трабл с лайками:" + err)
            })
        }
        else
        {
            putLikeOnCard(cardId)
            .then((data) => {
                evt.target.classList.toggle('elements__like-btn_active'); 
                cardNum.textContent = data.likes.length
                liked = true
            })
            .catch((err) => {
                console.log("Трабл с лайками:" + err)
            })
        }
    });

    cardImage.addEventListener('click', function () {openFullSizeImg(cardName, cardLink)});

    cardTrash.addEventListener('click', () => {
        removeCardFromServer(cardId)
        .then(() => {
            card.remove()
        })
        .catch((err) => {
            console.log('Траблы с удалением:' + err + " , может, эта карточка не твоя?!")
        })
    })
    return card
}

//Функция добавления карточек в DOM
export function insertInitialCards(mas, elementsCards) {
    
    for (let i = 0; i !== mas.length; i++)
    {
        elementsCards.prepend(insertCardData(mas[i].name, mas[i].link, mas[i].likes, mas[i].owner._id, mas[i]._id)); 
    }
}