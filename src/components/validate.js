export const enableValidation = (validate) => {
  
    const formList = Array.from(document.querySelectorAll(validate.formContainer));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
  
      });
      
      setEventListeners(formElement);
    });
  

  function setEventListeners(formElement){
      const inputList = Array.from(formElement.querySelectorAll(validate.inputSelector));
      console.log(validate.inputSelector)
      const buttonSubmit = formElement.querySelector(validate.submitButtonSelector);

      formElement.addEventListener('reset', () => {
        setTimeout(() => {
          toggleButtonState(inputList, buttonSubmit);
        }, 0)
      })

      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(inputList, buttonSubmit);
        });
      });
  };

  function toggleButtonState (inputList, buttonSubmit){
      if (hasInvalidInput(inputList)) {
        buttonSubmit.classList.add(validate.inactiveButtonClass)
        buttonSubmit.setAttribute('disabled', '')
      } else {
        buttonSubmit.classList.remove(validate.inactiveButtonClass)
        buttonSubmit.removeAttribute('disabled', '')
      }
  }

  function checkInputValidity(formElement, inputElement){
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    formElement.querySelector(validate.submitButtonSelector).setAttribute('disabled', '')
      showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    formElement.querySelector(validate.submitButtonSelector).removeAttribute('disabled', '')
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