//Константы

//Профиль
const profileInfoBtn = document.querySelector('.profile-info__edit-button')
const profileName = document.querySelector('.profile-info__username')
const profileText = document.querySelector('.profile-info__usertext')

//Попап профиля
const popupProfileInfoChange = document.querySelector('#popupProfile')
const popupProfileSaveBtn = popupProfileInfoChange.querySelector('.popup__send-btn')
const popupProfileCloseBtn = popupProfileInfoChange.querySelector('.popup__close-btn')
const firstProfileFieldPopup = popupProfileInfoChange.querySelector('#firstFieldPopup')
const secondProfileFieldPopup = popupProfileInfoChange.querySelector('#secondFieldPopup')

//Попап карточек
const popupCardsInfoChange = document.querySelector('#popupCards')
const popupCardsSaveBtn = popupCardsInfoChange.querySelector('.popup__send-btn') 
const popupCardsCloseBtn = popupCardsInfoChange.querySelector('.popup__close-btn')
const firstCardsFieldPopup = popupCardsInfoChange.querySelector('#firstFieldPopup')
const secondCardsFieldPopup = popupCardsInfoChange.querySelector('#secondFieldPopup')

//Карточки 
const elementsCards = document.querySelector('.elements')
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
const imgPopup = document.querySelector('.popup-img')
const imgPopupCloseBtn = imgPopup.querySelector('.popup-img__close-btn')

//Переменные

let imgPopupImage = imgPopup.querySelector('.popup-img__image')
let imgPopupTitle = imgPopup.querySelector('.popup-img__title')


//Функции


//Закрытие попапа
function closePopup(popup) {
    popup.style = ""
    popup.classList.remove('popup_opened');
}

//Открыте попапа
function openPopup(popup) {
    popup.style = "visibility: visible; opacity: 1"
    popup.classList.add('popup_opened');
}

// хз, это в методичке было написанно, думаю, чтоб вся инфа не летела при отправке формы, но у меня нет submit-ов в коде
function handleFormSubmit(evt) {
    evt.preventDefault(); 
}

//Функция открытия попапа карточек
function openCardPopup(){
    openPopup(popupCardsInfoChange)
    firstCardsFieldPopup.value = null
    secondCardsFieldPopup.value = null
}

//Функция добавления карточек + колбэки
function addCard(cardName, cardLink) {
    let template = document.querySelector('#cardTemplate')
    template = template.content.cloneNode(true)

    const cardContainer = template.querySelector('.elements__element')

    const cardTrash = template.querySelector('.elements__trash')

    const cardImage = template.querySelector('.elements__image')

    cardImage.src = cardLink
    cardImage.alt = cardName

    const cardTitle = template.querySelector('.elements__title')
    cardTitle.textContent = cardName

    const cardLike = template.querySelector('.elements__like-btn')

    cardContainer.append(cardTrash, cardImage, cardTitle, cardLike)
    elementsCards.prepend(cardContainer); 
    elementsCards.querySelector('.elements__like-btn').addEventListener('click', function (evt){evt.target.classList.toggle('elements__like-btn_active');});

    elementsCards.querySelector('.elements__image').addEventListener('click', function (){fullSizeImg(cardImage.alt, cardImage.src)});

    cardTrash.addEventListener('click', function () {
        this.parentElement.remove()
    })
}

//Функция добавления карточек в DOM
function cardsAdd(mas) {
    
    for (let i = 0; i !== mas.length; i++)
    {
        addCard(mas[i].name, mas[i].link)
    }
}

//Функция открытия попапа картинки
function fullSizeImg(title, img) {
    imgPopup.classList.add('popup-img_opened')
    imgPopupImage.src = img
    imgPopupTitle.textContent = title 
}


//Мониторинг

//Отправка данных из попапа профиля и её закрытие
popupProfileSaveBtn.addEventListener('click', function (){
            profileName.textContent = firstProfileFieldPopup.value
            profileText.textContent = secondProfileFieldPopup.value
    closePopup(popupProfileInfoChange)    
})

//Открытие попапа профиля
profileInfoBtn.addEventListener('click', function (){
    openPopup(popupProfileInfoChange)
    firstProfileFieldPopup.value = profileName.textContent
    secondProfileFieldPopup.value = profileText.textContent
})

//Закрытие попапа профиля
popupProfileCloseBtn.addEventListener('click', function (){
    closePopup(popupProfileInfoChange)
})

//Не отправляем формы
document.addEventListener('submit', handleFormSubmit); 

//Добавляем карточки из массива
cardsAdd(initialCards)

//Закрытие попапа карточек
imgPopupCloseBtn.addEventListener('click', function (){
    imgPopup.classList.remove('popup-img_opened')
})


//Открытие попапа карточек нажатием на "Enter"
document.addEventListener("keydown", function(e){if (e.keyCode == 13){openCardPopup()}}); 

//Открытие попапа карточек
addCardsBtn.addEventListener('click', function() {
    openCardPopup()
})

//Закрытие попапа карточек
popupCardsCloseBtn.addEventListener('click', function() {
    closePopup(popupCardsInfoChange)
})

//Отправка данных из попапа карточек и её закрытие
popupCardsSaveBtn.addEventListener('click', function(){
    closePopup(popupCardsInfoChange) 
    addCard(firstCardsFieldPopup.value, secondCardsFieldPopup.value)
})
