export function checkContactValidity (input, optionsObj) {
    let matchedOption = optionsObj.filter(option => option.value == input.parentNode.querySelector('select').textContent);
    let validationRegExp = matchedOption[0].validationRegExp;
    let popupAlert = document.createElement('div');

    if (validationRegExp.test(input.value) && input.nextSibling.classList.contains('new-contact__input--invalid_alert-popup')) {
        input.classList.remove('new-contact__input--invalid');
        input.nextSibling.remove();
    }
    else if (!input.parentNode.querySelector('.new-contact__input--invalid_alert-popup') && !validationRegExp.test(input.value)) {
        input.classList.add('new-contact__input--invalid');
        popupAlert.classList.add('new-contact__input--invalid_alert-popup');
        popupAlert.textContent = `${matchedOption[0].title}`;
        input.after(popupAlert);
    }
}

export function checkClientNameValidity (input, regExp) {
    let popupAlert = document.createElement('div');
    popupAlert.classList.add('input--invalid_alert');
    if (input.classList.contains('input_lastname') && !regExp.test(input.value) && input.value.length > 0 && !input.parentNode.querySelector('.input--invalid_alert')) {
        popupAlert.innerHTML = 'Только русские буквы и/или тире, не менее 2х знаков';
        input.parentNode.append(popupAlert);
        input.style.borderBottom = '1px solid #F06A4D';
    }

    else if ((!regExp.test(input.value) || input.value.length == 0) && !input.parentNode.querySelector('.input--invalid_alert') && !input.classList.contains('input_lastname')) {
        popupAlert.innerHTML = 'Обязательно к заполнению. <br> Только русские буквы и/или "-". Не менее 2х знаков, в т.ч. и после "-"';
        input.parentNode.append(popupAlert);
        input.style.borderBottom = '1px solid #F06A4D';
    }
    else if (regExp.test(input.value) && input.parentNode.querySelector('.input--invalid_alert')
        || input.classList.contains('input_lastname') && input.value == 0 && input.parentNode.querySelector('.input--invalid_alert')) {
        input.parentNode.querySelector('.input--invalid_alert').remove();
        input.style.borderBottom = '1px solid rgba(200, 197, 209, 0.5)';
    }
}

export function checkContactValidation(inputEl, optionsObj) {
    for (let input of inputEl) {

        let matchedOption = optionsObj.filter(option => option.value == input.parentNode.querySelector('select').textContent);
        let validationRegExp = matchedOption[0].validationRegExp;
        let popupAlert = document.createElement('div');

        if (validationRegExp.test(input.value) && input.nextSibling.classList.contains('new-contact__input--invalid_alert-popup')) {
            input.classList.remove('new-contact__input--invalid');
            input.nextSibling.remove();
        }
        else if (!input.parentNode.querySelector('.new-contact__input--invalid_alert-popup') && !validationRegExp.test(input.value)) {
            input.classList.add('new-contact__input--invalid');
            popupAlert.classList.add('new-contact__input--invalid_alert-popup');
            popupAlert.textContent = `${matchedOption[0].title}`;
            input.after(popupAlert);
        }
    }
};

export function checkInputValidation(classNameOfInputs, regExp) {
    let inputs = document.getElementsByClassName(classNameOfInputs);

    for (let input of inputs) {
        let popupAlert = document.createElement('div');
        let inputLabel = input.closest('label').getElementsByClassName('label__text')[0];
        popupAlert.classList.add('input--invalid_alert');
        if (input.classList.contains('input_lastname') && !regExp.test(input.value) && input.value.length > 0 && !input.parentNode.querySelector('.input--invalid_alert')) {
            popupAlert.innerHTML = 'Только русские буквы и/или тире, не менее 2х знаков';
            input.parentNode.append(popupAlert);
            input.style.borderBottom = '1px solid #F06A4D';
        }

        else if ((!regExp.test(input.value) || input.value.length == 0) && !input.parentNode.querySelector('.input--invalid_alert') && !input.classList.contains('input_lastname')) {
            popupAlert.innerHTML = 'Обязательно к заполнению. <br> Только русские буквы и/или тире, не менее 2х знаков';
            input.parentNode.append(popupAlert);
            input.style.borderBottom = '1px solid #F06A4D';
        }
        else if (regExp.test(input.value) && input.parentNode.querySelector('.input--invalid_alert')
            || input.classList.contains('input_lastname') && input.value == 0 && input.parentNode.querySelector('.input--invalid_alert')) {
            input.parentNode.querySelector('.input--invalid_alert').remove();
            input.style.borderBottom = '1px solid rgba(200, 197, 209, 0.5)';
        }
    }
};