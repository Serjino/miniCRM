import { options } from './objects.js';
import { eraseInputValue } from './DOM-manipulation.js';


export function colorActiveSortHeading (sortArrow) {
    let tableHeadings = document.getElementsByClassName('clients-table__heading');
    for (let tableHeading of tableHeadings) {
        tableHeading.classList.remove('clients-table__heading--sorted');
    }
    let tableHeadingActive = sortArrow.closest('.clients-table__heading');
    tableHeadingActive.classList.add('clients-table__heading--sorted');
}

export function eraseInvalidAlert (e) {
    if (e.target.closest('.choices') != null) {
            let contactWrapper = e.target.closest('.new-contact__wrapper');
            let invalidAlert = contactWrapper.getElementsByClassName('new-contact__input--invalid_alert-popup')[0];
            let input = contactWrapper.getElementsByClassName('new-contact__input')[0];
            let btnEraseInput = contactWrapper.getElementsByClassName('new-contact__btn')[0];

            if (invalidAlert != undefined) {
                btnEraseInput.classList.remove('btn_erase-input');
                input.classList.remove('new-contact__input--invalid');
                btnEraseInput.classList.add('btn_delete-contact');
                
                input.value = '';
                
                invalidAlert.remove();
            }
        }
    }

export function useImaskOrDefaultInputValue(e) {
    let selects = document.getElementsByClassName('choices__list--dropdown is-active');

        
    for (let select of selects) {
        e.preventDefault();


        if (e.target.classList.contains('choices__item--choice')) {
            let matchedOption = options.filter(option => option.text == e.target.textContent);
            let input = select.parentNode.parentNode.querySelector('.new-contact__input');

            input.placeholder = `${matchedOption[0].placeholder}`;
            input.title = `${matchedOption[0].title}`;
            
            if (matchedOption[0].inputValue != undefined) {
                input.value = matchedOption[0].inputValue;
            }
            if (matchedOption[0].inputValue == undefined) {
                eraseInputValue(input);
            }
            if (matchedOption[0].mask != undefined) {
                $(input).mask(`${matchedOption[0].mask}`, {
                    autoclear: false,
                });
            }
            else {
                $(input).unmask(`${matchedOption[0].mask}`, {
                    autoclear: false,
                });
            }

        }
    }
}

export function eraseValueOrDeleteContact(contact, deleteBtn) {

    let contactsWrapper = contact.parentNode;
    let contacts = contactsWrapper.getElementsByClassName('new-contact__wrapper');
    let addClientBtnWrapper = document.getElementById('addNewContactBtn').parentElement;
    let input = contact.getElementsByClassName('new-contact__input')[0];

    // let newContact = this.parentElement;
    if ((/\+7\040\(\_\_\_\)\040\_\_\_\-\_\_\-\_\_/).test(input.value) || input.value == "" || input.value.length == 0) {

        if (confirm("Удалить контакт?")) {
            if (contacts.length <= 1) {
                contactsWrapper.classList.remove('new-contacts--active');
                addClientBtnWrapper.classList.remove('add-client-form__add-contact--active');
            }
            input.parentNode.remove();
        }

        else {
            return;
        }
    }
    // Delete Btn = Erase Btn, when user filled it with some data
    else if (input.value.length > 0) {
        eraseInputValue(input);
        deleteBtn.classList.remove('btn_erase-input');
        deleteBtn.classList.add('btn_delete-contact');
    }
}

export function switcBtwDeleteAndEraseBtn(deleteBtn, input) {
    if ((/\+7\040\(\_\_\_\)\040\_\_\_\-\_\_\-\_\_/).test(input.value) || input.value == "" || input.value.length == 0) {
        deleteBtn.classList.remove('btn_erase-input');
        deleteBtn.classList.add('btn_delete-contact')
    }
    else if (input.value.length > 0) {
        deleteBtn.classList.remove('btn_delete-contact');
        deleteBtn.classList.add('btn_erase-input');
    }
}
