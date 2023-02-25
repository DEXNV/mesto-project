export const enableValidation = (validate) => {
  
    const formList = Array.from(document.querySelectorAll(validate.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
  
      });
      
      const fieldsetList = Array.from(formElement.querySelectorAll(validate.formContainer));
  
      fieldsetList.forEach((evt) => {
        setEventListeners(evt);
      }); 
    });
  

  function setEventListeners(formElement){
      const inputList = Array.from(formElement.querySelectorAll(validate.inputSelector));
      console.log(validate.inputSelector)
      const buttonElement = formElement.querySelector(validate.submitButtonSelector);

      
      toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
      });
  };

  function toggleButtonState (inputList, buttonElement){
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validate.inactiveButtonClass)
      } else {
        buttonElement.classList.remove(validate.inactiveButtonClass)
      }
  }

  function checkInputValidity(formElement, inputElement){
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
      hideInputError(formElement, inputElement);
  }
  };

  function showInputError(formElement, inputElement, errorMessage){
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(validate.inputError);
      errorElement.textContent = errorMessage;
  };
    
  function hideInputError(formElement, inputElement){
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(validate.inputError);
      errorElement.textContent = '';
  };

  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  };
};