import { addClient, changeClient, getClients } from './server-req.js';
import { deleteElements, createTableRow, eraseInputValue, removeEqualOptionsFromSelect, createTable } from './DOM-manipulation.js';
import { options } from './objects.js';
import { checkContactValidation, checkInputValidation, checkContactValidity } from './form-validation.js';
import { useImaskOrDefaultInputValue, eraseValueOrDeleteContact, switcBtwDeleteAndEraseBtn, eraseInvalidAlert } from './additional-features.js';

let searchTimeout;

export function openAddClientForm() {

    let addClientForm = document.querySelector('.modal-window_add-client');
    let addClientFormLegend = document.querySelector('.add-client-form__legend');
    let labelTexts = document.getElementsByClassName('label__text');
    let inputs = document.querySelectorAll('.add-client-form__input');
    let inputName = document.querySelector('.input_name');
    let inputSurname = document.querySelector('.input_surname');
    let inputLastname = document.querySelector('.input_lastname');
    let clientIDCell = document.querySelector('.add-client-form__client-id');

    inputName.placeholder = 'Имя*';
    inputSurname.placeholder = 'Фамилия*';
    inputLastname.placeholder = 'Отчество';
    clientIDCell.textContent = "";
    addClientFormLegend.textContent = 'Новый Клиент';

    for (let input of inputs) {
        input.value = "";
    }

    if (labelTexts != undefined) {
        deleteElements(labelTexts);
    }

    addClientForm.classList.add('modal-window_active');
    document.body.classList.add('disable-scroll');
}

export function openChangeClientForm() {

    let addClientFormModalWindow = document.querySelector('.modal-window_add-client');
    let addClientFormLegend = document.querySelector('.add-client-form__legend');
    let addClientForm = document.querySelector('.add-client-form');
    let inputName = document.querySelector('.input_name');
    let inputSurname = document.querySelector('.input_surname');
    let inputLastname = document.querySelector('.input_lastname');

    inputName.placeholder = '';
    inputSurname.placeholder = '';
    inputLastname.placeholder = '';

    addClientFormLegend.textContent = 'Изменить данные';

    if (document.getElementsByClassName('label__input_reguired').length == 0) {
        let labels = addClientForm.getElementsByClassName('label')

        for (let label of labels) {
            let labelText = document.createElement('span');
            labelText.classList.add('label__text');

            let labelRequired = document.createElement('span');
            labelRequired.classList.add('label__input_reguired');
            labelRequired.textContent = '*';

            if (label.classList.contains('label_name')) {
                labelText.textContent = 'Имя';
                labelText.append(labelRequired);
            }
            else if (label.classList.contains('label_surname')) {
                labelText.textContent = 'Фамилия';
                labelText.append(labelRequired);
            }
            else if (label.classList.contains('label_lastname')) {
                labelText.textContent = 'Отчество';
            }

            label.prepend(labelText);
        }
    }

    addClientFormModalWindow.classList.add('modal-window_active');
    document.body.classList.add('disable-scroll');
}

export async function saveClient() {
    let addClientModalWindow = document.querySelector('.modal-window_add-client');
    let addClientForm = document.querySelector('.add-client-form');
    let addClientFormLegend = document.querySelector('.add-client-form__legend');
    let clientIdСell = addClientForm.getElementsByClassName('add-client-form__client-id')[0];

    let addClientFormInputs = document.querySelectorAll('.add-client-form__input');
    let inputName = document.querySelector('.input_name');
    let inputSurname = document.querySelector('.input_surname');
    let inputLastname = document.querySelector('.input_lastname');


    let newContacts = document.getElementById('newContacts');
    let addContactRow = document.querySelector('.add-contact');
    let contactInputs = document.getElementsByClassName('new-contact__input');

    let clientID = clientIdСell.textContent.split(' ')[1];

    // Object created to be filled with inputed values
    let client = {
        name: `${inputName.value}`,
        surname: `${inputSurname.value}`,
        lastName: `${inputLastname.value}`,
    }

    client.contacts = [];

    // Adding contacts to New Client
    if (contactInputs.length > 0) {
        for (let contactInput of contactInputs) {
            let contact = {};
            let select = contactInput.parentNode
                .querySelector('.choices__inner')
                .querySelector('.new-contact-select');
            contact.type = select.textContent;
            contact.value = contactInput.value;
            client.contacts.push(contact);
        }
    }

    checkInputValidation('add-client-form__input', /^([А-Яа-яЁё\-]{2,})$/);
    checkContactValidation(contactInputs, options);

    // This would cancel form submit, if there any validation alerts are exist
    if (addClientForm.querySelector('.input--invalid_alert') || addClientForm.querySelector('.new-contact__input--invalid_alert-popup')) {
        return;
    }
    // ====

    for (let addClientFormInput of addClientFormInputs) {
        if (addClientFormInput.type != 'submit') {
            eraseInputValue(addClientFormInput);
        }
    };

    newContacts.classList.remove('new-contacts--active');
    deleteElements(newContacts.childNodes);
    addContactRow.classList.remove('add-client-form__add-contact--active');
    addClientModalWindow.classList.toggle('modal-window_active');
    document.body.classList.toggle('disable-scroll');

    // Switching behavior between two conditions - change existed Client or add New one.

    if (addClientFormLegend.textContent == 'Изменить данные') {
        await changeClient(client, clientID);
        let labelTexts = document.getElementsByClassName('label__text');
        let tableRows = document.getElementsByClassName('clients-table__row')

        deleteElements(labelTexts);
        deleteElements(tableRows);
        let clients = await getClients();
        createTable(clients);
    }
    else {
        let newClient = await addClient(client);
        createTableRow(newClient);
    }
}

export function createNewContactRow(elementToAppend, optionsObj, selectedValue) {

    let addClientBtnWrapper = document.getElementById('addNewContactBtn').parentNode;
    addClientBtnWrapper.classList.add('add-client-form__add-contact--active');

    // New Contact Form
    let newContactEl = document.createElement('div');
    newContactEl.classList.add('new-contact', 'add-client-form__new-contact');

    // New Contact Wrapper
    let newContactsWrapper = document.createElement('div');
    newContactsWrapper.classList.add('new-contacts');

    // New Contact Wrapper
    let newContactWrapper = document.createElement('div');
    newContactWrapper.classList.add('new-contact__wrapper');

    // Select 
    let newContactSelect = document.createElement('select');
    newContactSelect.classList.add('new-contact-select');

    // Select Options
    for (let i = 0; i < optionsObj.length; i++) {
        let contactOptionEl = document.createElement('option');
        contactOptionEl.classList.add('new-contact__option');
        contactOptionEl.value = optionsObj[i].text;
        contactOptionEl.textContent = optionsObj[i].text;
        if (contactOptionEl.textContent == selectedValue) {
            contactOptionEl.setAttribute('selected', '');
            newContactSelect.prepend(contactOptionEl);
        }
        else {
            newContactSelect.append(contactOptionEl);
        }
    }

    // Input For Contacts
    let inputEl = document.createElement('input');
    inputEl.classList.add('new-contact__input');

    //--Get Select value, look for matching into options, get matched object from massive and create
    let matchedOption = options.filter(option => option.value == newContactSelect.value);

    inputEl.placeholder = matchedOption[0].placeholder;
    inputEl.setAttribute('required', '');
    inputEl.title = `${matchedOption[0].title}`;
    if (matchedOption[0].mask != undefined) {
        $(inputEl).mask(`${matchedOption[0].mask}`, {
            autoclear: false,
        });
    }

    // Input Erase Btn / Delete Contact Btn
    let deleteContactBtn = document.createElement('div');
    deleteContactBtn.classList.add('btn', 'new-contact__btn', 'btn_delete-contact');


    // Erase Btn = Delete Btn, when input value is empty, or equal empty mask
    deleteContactBtn.addEventListener('click', function () {
        let contact = this.parentNode;
        let deleteBtn = this;
        eraseValueOrDeleteContact(contact, deleteBtn);
    });

    // Validation by keyup
    let inputTimeout;
    inputEl.addEventListener('keyup', function(){
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(function(){
            checkContactValidity(inputEl, options);
        }, 300);
    })
   

    // Switch Erase Btn to Delete Btn, upon following conditions
    inputEl.addEventListener('keyup', function () {
        switcBtwDeleteAndEraseBtn(deleteContactBtn, inputEl);
    });

    // Adding to DOM

    newContactWrapper.append(newContactSelect);
    newContactWrapper.append(inputEl);
    newContactWrapper.append(deleteContactBtn);
    newContactEl.append(newContactWrapper);
    elementToAppend.append(newContactWrapper);

    // Choices.js plugin Setup
    new Choices(newContactSelect, {
        searchEnabled: false,
        itemSelectText: '',
    });

    document.addEventListener('mousedown', function (e) {
        eraseInvalidAlert(e);
        useImaskOrDefaultInputValue(e);
    });

    let selectPluginWrappers = document.getElementsByClassName('choices');
    for (let selectPluginWrapper of selectPluginWrappers) {
        selectPluginWrapper.addEventListener('click', function (e) {
            removeEqualOptionsFromSelect(this);
        });
    }

    return {
        inputEl,
        newContactSelect,
        deleteContactBtn,
        newContactEl,
    }
}

export function cancelUsingClientForm() {
    if (confirm("Все несохраненные данные Клиента будут удалены. Продолжить?")) {
        let newContactsWrapper = document.getElementById('newContacts');
        let contacts = document.getElementsByClassName('new-contact__wrapper');
        let addContact = document.querySelector('.add-contact');
        let addClientModalWindow = document.getElementsByClassName('modal-window_add-client')[0];
        let addClientFormInputs = document.getElementsByClassName('.add-client-form__input');
        let validationAlerts = document.getElementsByClassName('input--invalid_alert');
        let inputs = document.getElementsByClassName('add-client-form__input');

        for (let input of inputs) {
            input.style.borderBottom = '1px solid rgba(200, 197, 209, 0.5)';
        }

        deleteElements(validationAlerts);

        addClientModalWindow.classList.toggle('modal-window_active');
        document.body.classList.toggle('disable-scroll');

        for (let addClientFormInput of addClientFormInputs) {
            if (addClientFormInput.type != 'submit') {
                addClientFormInput.value = '';
            }
        }

        deleteElements(contacts);
        newContactsWrapper.classList.remove('new-contacts--active');
        addContact.classList.remove('add-client-form__add-contact--active');
    }
    else {
        return;
    }
}

export async function searchClient() {
    clearTimeout(searchTimeout);
    let searchInput = document.getElementById('search');
    let sortBtns = document.querySelectorAll('.clients-table__sort-arrow');
    sortBtns.forEach(sortBtn => sortBtn.classList.remove('clients-table__sort-arrow__descend'))
    searchTimeout = setTimeout(async function () {

        let clients = await getClients();
        let matchedClients = clients.filter(function (client) {
            let clientContacts = '';
            for (let i = 0; i < client.contacts.length; i++) {
                clientContacts += client.contacts[i].value;
            }
            let clientValues = (clientContacts+ client.surname + client.name  + client.lastName).replace(/[\(\)\040]/g, '');
            if (clientValues.toLowerCase().indexOf(searchInput.value.toLowerCase().replace(/\040/g, '')) > -1) {
                return true;
            }
        });

        let tr = document.getElementsByClassName('clients-table__row');
        deleteElements(tr);

        for (let i = 0; i < matchedClients.length; i++) {
            createTableRow(matchedClients[i]);
        };
    }, 300)
}
