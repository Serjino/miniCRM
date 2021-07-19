import { createNewContactRow } from './btn-events.js';
import { options } from './objects.js';

export function dateFromUTCtoString(dateUTC) {
    return new Date(dateUTC).toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '')
};

// Below function convert date and time get from server into folowing obj:
// {
//    day: 'DD',
//    month: `MM`,
//    year: 'YYYY',
//    hour: 'HH';,
//    minutes: 'MM',
//    fullDate: `DD.MM.YYYY`;
//    fullTime: `HH:MM`;
// }

export function splitDateString(emptyObj, dateUTC) {
    let serverDate = new Date(dateFromUTCtoString(dateUTC));

    let day = serverDate.getDate();

    if (day < 10) {
        day = `0` + day;
    }

    emptyObj.day = day;


    let month = serverDate.getMonth() + 1;

    if (month < 10) {
        month = `0` + month;
    }

    emptyObj.month = month;
    emptyObj.year = serverDate.getFullYear();
    emptyObj.hours = serverDate.getHours() + 3;

    let minutes = serverDate.getMinutes();

    if (minutes < 10) {
        minutes = `0` + minutes;
    }

    emptyObj.minutes = minutes;
    emptyObj.fullDate = `${emptyObj.day}.` + `${emptyObj.month}.` + `${emptyObj.year}`;
    emptyObj.fullTime = `${emptyObj.hours}:` + `${emptyObj.minutes}`;
    return emptyObj;
};

// ================================

export function fillChangeClientForm(client, optionsObj) {
    let inputName = document.querySelector('.input_name');
    let inputSurname = document.querySelector('.input_surname');
    let inputLastname = document.querySelector('.input_lastname');
    let addContactBtnWrapper = document.querySelector('.add-client-form__add-contact');
    let newContacts = document.getElementById('newContacts');
    let clientIdEl = document.querySelector('.add-client-form__client-id');

    inputName.value = client.name;
    inputSurname.value = client.surname;
    clientIdEl.textContent = `ID: ${client.id}`;

    if (client.lastName == undefined) {
        inputLastname.value = "";
    }
    else {
        inputLastname.value = client.lastName;
    }

    if (client.contacts.length > 0) {
        addContactBtnWrapper.classList.add('add-client-form__add-contact--active');

        for (let i = 0; i < client.contacts.length; i++) {
            newContacts.classList.add('new-contacts--active');
            let contact = createNewContactRow(newContacts, options, client.contacts[i].type);
            let matchedOption = optionsObj.filter(option => option.value == client.contacts[i].type);

            contact.inputEl.placeholder = matchedOption[0].placeholder;
            contact.inputEl.setAttribute('required', '');
            contact.inputEl.title = `${matchedOption[0].title}`;
            contact.deleteContactBtn.classList.add('btn_erase-input');
            if (matchedOption[0].mask != undefined) {
                $(contact.inputEl).mask(`${matchedOption[0].mask}`, {
                    autoclear: false,
                });
            }
            else {
                $(contact.inputEl).unmask();
            }

            contact.inputEl.value = client.contacts[i].value;
        }

    }
}
