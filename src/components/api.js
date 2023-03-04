//Конфиг объект
const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
    headers: {
      authorization: 'ff0a3e57-047a-4f14-a16d-2d1276fc5c62',
      'Content-Type': 'application/json'
    }
  }

//Получение данных о профиле
export function getMeFromServer(){
    return fetch(config.baseUrl + "/users/me", {headers: config.headers})
    .then(res => res.json())
    .catch(err => {console.log("Буллшит какой-то c аккаунтом:" + err)});
}

//Обновление данных о профиле
export function postMeOnServer(name, about){
    return fetch(config.baseUrl + "/users/me", {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        about: about
    })
    })
    .catch((err) => {
        console.log(err);
    });
}

//Обновление аватара профиля
export function postMyNewAvatar(avatar){
    return fetch(config.baseUrl + "/users/me/avatar", {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: avatar
    })
    })
}

//Добавление карточки
export function postCardOnServer(name, about){
    return fetch(config.baseUrl + "/cards", {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        link: about
    })
    })
}

//Лайк на карточку
export function putLikeOnCard(cardId){
    fetch(config.baseUrl + "/cards/likes/" + cardId, {
    method: 'PUT',
    headers: config.headers,
    }); 
}

//Снятие лайка с карточки
export function removeLikeFromCard(cardId){
    fetch(config.baseUrl + "/cards/likes/" + cardId, {
    method: 'DELETE',
    headers: config.headers,
    }); 
}


//Удаление карточки
export function removeCardFromServer(cardId){
    fetch(config.baseUrl + "/cards/" + cardId, {
    method: 'DELETE',
    headers: config.headers,
    }); 
}

//Карточки
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Опа: ${res.status}`);
    })
} 