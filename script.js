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
const imgPopup = document.querySelector('#imgPopup')
const imgPopupCloseBtn = imgPopup.querySelector('.popup__img-close-btn')
const imgPopupImage = imgPopup.querySelector('.popup__image')
const imgPopupTitle = imgPopup.querySelector('.popup__img-title')


//Функции


//Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//Открыте попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// хз, это в методичке было написанно, думаю, чтоб вся инфа не летела при отправке формы, но у меня нет submit-ов в коде
function handleFormSubmit(evt) {
    evt.preventDefault(); 
}

//Функция открытия попапа карточек
function openCardPopup(){
    firstCardsFieldPopup.value = null
    secondCardsFieldPopup.value = null
    openPopup(popupCardsInfoChange)
}

//Функция добавления карточек + колбэки
function addExemplCard() {
    const template = document.querySelector('#cardTemplate').content

    const cardContainer = template.querySelector('.elements__element').cloneNode(true)

    return cardContainer
}

function cardInsertData(cardName, cardLink) {
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
function cardInsert(mas) {
    
    for (let i = 0; i !== mas.length; i++)
    {
        elementsCards.prepend(cardInsertData(mas[i].name, mas[i].link)); 
    }
}

//Функция открытия попапа картинки
function fullSizeImg(title, img) {
    imgPopupImage.src = img
    imgPopupTitle.textContent = title 
    imgPopup.classList.add('popup_opened')
}

//Функция добавления и закрытия попапа карточек
function addAndCloseCard() {
    elementsCards.prepend(cardInsertData(firstCardsFieldPopup.value, secondCardsFieldPopup.value))
    closePopup(popupCardsInfoChange) 
}

//Функция добавления и закрытия попапа профиля
function addAndCloseProfile() {
    profileName.textContent = firstProfileFieldPopup.value
    profileText.textContent = secondProfileFieldPopup.value
    closePopup(popupProfileInfoChange)    
}


//Мониторинг

//Отправка данных из попапа профиля и её закрытие
popupProfileInfoChange.addEventListener('submit', function (){
    addAndCloseProfile()
})

//Открытие попапа профиля
profileInfoBtn.addEventListener('click', function (){
    firstProfileFieldPopup.value = profileName.textContent
    secondProfileFieldPopup.value = profileText.textContent
    openPopup(popupProfileInfoChange)
})

//Закрытие попапа профиля
popupProfileCloseBtn.addEventListener('click', function (){
    closePopup(popupProfileInfoChange)
})

//Не отправляем формы
popupProfileInfoChange.addEventListener('submit', handleFormSubmit); 

popupCardsInfoChange.addEventListener('submit', handleFormSubmit); 

//Добавляем карточки из массива
cardInsert(initialCards)

//Закрытие попапа карточек
imgPopupCloseBtn.addEventListener('click', function (){
    imgPopup.classList.remove('popup-img_opened')
})

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
    addAndCloseCard()
})

//Закрытие попапа картинки
imgPopupCloseBtn.addEventListener('click', function(){
    closePopup(imgPopup)
})