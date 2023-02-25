//Закрытие попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.querySelectorAll('.popup__field').forEach(function (evt){
        evt.classList.remove('popup__field_type_error');
        popup.querySelector(`#${evt.id}-error`).textContent = null
    })
}

//Открыте попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
}