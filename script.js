//Константы

//Профиль
const profileInfoBtn = document.querySelector('.profile-info__edit-button')
const profileName = document.querySelector('.profile-info__username')
const profileText = document.querySelector('.profile-info__usertext')

//Попап
const popupInfoChange = document.querySelector('.popup')
const popupSaveBtn = document.querySelector('.popup__send-btn') //!Не использую popupInfoChange т.к короче написать так! Дальше также
const popupCloseBtn = document.querySelector('.popup__close-btn')
const popupTitle = document.querySelector('.popup__title')
const firstFieldPopup = document.querySelector('#firstFieldPopup')
const secondFieldPopup = document.querySelector('#secondFieldPopup')

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

let whatPopupSend = null
let imgPopupImage = imgPopup.querySelector('.popup-img__image')
let imgPopupTitle = imgPopup.querySelector('.popup-img__title')


//Функции

function openCardPopup(){
    whatPopupSend = "newCardInfo"
    popupInfoChange.classList.add('popup_opened');
    popupTitle.textContent = "Новое место"
    firstFieldPopup.value = null
    firstFieldPopup.placeholder = "Название"
    secondFieldPopup.value = null
    secondFieldPopup.placeholder = "Ссылка на картинку"
    popupInfoChange.style = "visibility: visible; opacity: 1"
}

document.addEventListener("keydown", function(e){if (e.keyCode == 13){openCardPopup()}}); 

// хз, это в методичке было написанно, думаю, чтоб вся инфа не летела при отправке формы, но у меня нет submit-ов в коде
function handleFormSubmit(evt) {
    evt.preventDefault(); 
}

//Функция добавления карточек + колбэки
function addCard(cardName, cardLink) {
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('elements__element')

    const cardTrash = document.createElement('button')
    cardTrash.classList.add('elements__trash')

    const cardImage = document.createElement('img')
    cardImage.classList.add('elements__image')
    cardImage.src = cardLink
    cardImage.alt = cardName

    const cardTitle = document.createElement('h3')
    cardTitle.classList.add('elements__title')
    cardTitle.textContent = cardName

    const cardLike = document.createElement('button')
    cardLike.classList.add('elements__like-btn')

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

//Функция открытия второго попапа(просмотр картинок)
function fullSizeImg(title, img) {
    imgPopup.classList.add('popup-img_opened')
    imgPopupImage.src = img
    imgPopupTitle.textContent = title 
}


//Мониторинг

//Отправка данных из формы и её закрытие
popupSaveBtn.addEventListener('click', function (){
    if ((whatPopupSend !== null) && (whatPopupSend !== undefined)){
        if (whatPopupSend === "profileInfo") {
            profileName.textContent = firstFieldPopup.value
            profileText.textContent = secondFieldPopup.value
        } else if(whatPopupSend === "newCardInfo"){
            let cardInto = [
            {
                name: firstFieldPopup.value,
                link: secondFieldPopup.value
            }];
            cardsAdd(cardInto)
        }
    }
    
    
    popupInfoChange.classList.remove('popup_opened');
})

//Открытие формы профиля
profileInfoBtn.addEventListener('click', function (){
    whatPopupSend = "profileInfo"
    popupInfoChange.classList.add('popup_opened');
    popupTitle.textContent = "Редактировать профиль"
    firstFieldPopup.value = profileName.textContent
    secondFieldPopup.value = profileText.textContent
    popupInfoChange.style = "visibility: visible; opacity: 1"
})

//Закрытие формы профиля
popupCloseBtn.addEventListener('click', function (){
    popupInfoChange.classList.remove('popup_opened');
    whatPopupSend = null
    popupInfoChange.style = ""
})



//Закрытие формы карточек
popupSaveBtn.addEventListener('click', function (){
    
    popupInfoChange.style = ""
    popupInfoChange.classList.remove('popup_opened');
})

//Открытие формы карточек
addCardsBtn.addEventListener('click', openCardPopup)

//Не отправляем формы
popupInfoChange.addEventListener('submit', handleFormSubmit); 

//Добавляем карточки из массива
cardsAdd(initialCards)

//Закрытие модального окна карточек
imgPopupCloseBtn.addEventListener('click', function (){
    imgPopup.classList.remove('popup-img_opened')
})


