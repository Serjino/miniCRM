import { openChangeClientForm } from './btn-events.js';
import { fillChangeClientForm, splitDateString} from './data-manipulation.js';
import { options } from './objects.js';
import { getClientById, deleteClient, getClients } from './server-req.js';

export function createTableRow(client) {
    let tableBody = document.querySelector('.clients-table__body');
    let tr = document.createElement('tr');

    // ID
    let clientIdCell = document.createElement('td');
    clientIdCell.classList.add('clients-table__cell', 'clients-table__cell_id');
    clientIdCell.textContent = `${client.id}`;

    // ClientName
    let clientNameCell = document.createElement('td');
    clientNameCell.classList.add('clients-table__cell', 'clients-table__cell_client-name');
    clientNameCell.textContent = `${client.surname} ` + `${client.name} ` + `${client.lastName}`;

    // CreationDate&Time
    let creationDateCell = document.createElement('td');
    let creationDate = document.createElement('span');
    let creationTime = document.createElement('span');

    creationDateCell.classList.add('clients-table__cell', 'clients-table__cell_creation-date-time');
    creationDate.classList.add('creation-date');
    creationDate.textContent = `${client.createdAt}`;
    creationTime.classList.add('creation-time');
    creationTime.textContent = `${client.createdAt}`;
    // -- Fill cells with date
    let timeOfCreation = {}; // empty obj to fill with date parametrs from disassembleDate function
    let updatedDate = {};

    splitDateString(timeOfCreation, client.createdAt);

    creationDate.textContent = `${timeOfCreation.fullDate}`;
    creationTime.textContent = `${timeOfCreation.fullTime}`;


    creationDateCell.append(creationDate);
    creationDateCell.append(creationTime);

    // LastChange
    let lastChangeCell = document.createElement('td');
    let changeDate = document.createElement('span');
    let changeTime = document.createElement('span');

    lastChangeCell.classList.add('clients-table__cell', 'clients-table__cell_last-change-time');
    changeDate.classList.add('change-date');
    changeDate.textContent = `${client.updatedAt}`;
    changeTime.classList.add('change-time');
    changeTime.textContent = `${client.updatedAt}`;

    // -- Fill cells with date
    splitDateString(updatedDate, client.updatedAt);

    let tableDate = `${updatedDate.day}.` + `${updatedDate.month}.` + `${updatedDate.year}`;
    let tableTime = `${updatedDate.hours}:` + `${updatedDate.minutes}`;

    changeDate.textContent = `${tableDate}`;
    changeTime.textContent = `${tableTime}`;

    lastChangeCell.append(changeDate);
    lastChangeCell.append(changeTime);
    // =====

    // Contacts
    let contactsCell = document.createElement('td');
    let contactsList = document.createElement('ul');


    for (let i = 0; i < client.contacts.length; i++) {
        let contactsListItem = document.createElement('li');
        contactsListItem.classList.add('contact');

        let contactsLink = document.createElement('a');
        contactsLink.classList.add('contact__link', 'contact__link_icon');


        switch (client.contacts[i].type) {
            case 'Телефон':
                contactsLink.classList.add('contact__link_tel');
                contactsLink.href = `tel:${client.contacts[i].value.replace(/[^+\d]/g, '')}`;
                break;
            case 'Доп. телефон':
                contactsLink.classList.add('contact__link_tel');
                contactsLink.href = `tel:${client.contacts[i].value.replace(/[^+\d]/g, '')}`;
                break;
            case 'Email':
                contactsLink.classList.add('contact__link_email');
                contactsLink.href = `mailto:${client.contacts[i].value}`;
                break;
            case 'Vk':
                contactsLink.classList.add('contact__link_vk');
                contactsLink.href = `https://vk.com/${client.contacts[i].value}`;
                contactsLink.target = '_blank';
                break;
            case 'Facebook':
                contactsLink.classList.add('contact__link_fb');
                contactsLink.href = `https://facebook.com/${client.contacts[i].value}`;
                contactsLink.target = '_blank';
                break;
        }

        let tooltip = document.createElement('div');

        let contactType = document.createElement('span');
        contactType.classList.add('contact__type');
        contactType.textContent = `${client.contacts[i].type}:`;


        let contactValue = document.createElement('span');
        contactValue.classList.add('contact__value');
        contactValue.textContent = `${client.contacts[i].value}`;



        tooltip.classList.add('contact__tooltip');
        tooltip.append(contactType);
        tooltip.append(contactValue);


        contactsListItem.append(contactsLink);
        contactsLink.after(tooltip);
        contactsList.append(contactsListItem);
    }

    contactsCell.classList.add('clients-table__cell', 'clients-table__cell_contacts');
    contactsList.classList.add('contacts');

    contactsCell.append(contactsList);

    // Actions
    let actionsCell = document.createElement('td');
    let changeClientBtn = document.createElement('button');
    let deleteClientBtn = document.createElement('button');

    actionsCell.classList.add('clients-table__cell', 'clients-table__cell_actions');
    changeClientBtn.classList.add('btn', 'clients-table__btn', 'clients-table__btn_change');
    changeClientBtn.textContent = `Изменить`;
    deleteClientBtn.classList.add('btn', 'clients-table__btn', 'clients-table__btn_delete');
    deleteClientBtn.textContent = `Удалить`;

    deleteClientBtn.addEventListener('click', function (e) {
        let tableRow = e.target.closest('tr');
        openDeleteConfirmationWindow(getClientIdFromTable(tableRow));
    });

    changeClientBtn.addEventListener('click', async function (e) {
        let clientId = e.target.closest('tr').getElementsByClassName('clients-table__cell_id')[0].textContent;
        let client = await getClientById(clientId);
        openChangeClientForm();
        fillChangeClientForm(client, options);
    });

    actionsCell.append(changeClientBtn);
    actionsCell.append(deleteClientBtn);


    tr.classList.add('clients-table__row');

    tr.append(clientIdCell);
    tr.append(clientNameCell);
    tr.append(creationDateCell);
    tr.append(lastChangeCell);
    tr.append(contactsCell);
    tr.append(actionsCell);

    tableBody.append(tr);
};

export function loadingSceneOn() {
    let clientsTable = document.querySelector('.clients-table');
    let overlayScene = document.createElement('div');
    overlayScene.classList.add('clients-table__loading-scene');
    clientsTable.prepend(overlayScene);
}

export function loadingSceneOff() {
    let overlayScene = document.getElementsByClassName('clients-table__loading-scene')[0];
    overlayScene.remove();
}

export async function createTable() {
    let loadingTimeout = setTimeout(function(){
        alert('Сервер не подключен. Обратитесь к администратору');
    }, 5000);
    loadingSceneOn();
    let clients = await getClients();
    for (let i = 0; i < clients.length; i++) {
        console.log(clients[i]);
        createTableRow(clients[i]); 
    };

    loadingSceneOff();
    clearTimeout(loadingTimeout);
}

export function openDeleteConfirmationWindow(clientID) {
    let modalWindow = document.createElement('div');
    modalWindow.classList.add(`modal-window`, `modal-window_deleteClient`, `modal-window_active`);

    let modalWindowInner = document.createElement('div');
    modalWindowInner.classList.add('modal-window__inner', `modal-window__inner_deleteClient`);

    let heading = document.createElement('h3');
    heading.classList.add('modal-window__heading');

    let text = document.createElement('p');
    text.classList.add('modal-window__text');

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'modal-window__btn', 'btn_do');

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn', 'modal-window__btn', 'btn_cancel');
    cancelBtn.textContent = 'Отмена';

    cancelBtn.addEventListener('click', function () {
        this.closest('.modal-window').remove()
    });


    let closeModalWindowBtn = document.createElement('button');
    closeModalWindowBtn.classList.add('btn', 'modal-window__btn', 'btn_close-window');

    closeModalWindowBtn.addEventListener('click', function () {
        this.closest('.modal-window').remove()
    });

    heading.textContent = 'Удалить Клиента';
    text.textContent = 'Вы действительно хотите удалить данного Клиента?';
    deleteBtn.textContent = 'Удалить';

    deleteBtn.addEventListener('click', async function () {
        let tr = document.getElementsByClassName('clients-table__row');
        await deleteClient(clientID);
        deleteElements(tr);
        createTable();
        this.closest('.modal-window').remove();
    });

    modalWindowInner.append(heading, closeModalWindowBtn, text, deleteBtn, cancelBtn);
    modalWindow.append(modalWindowInner);
    document.body.append(modalWindow);
}


export function deleteElements(HTMLCollection) {
    for (let i = HTMLCollection.length; i > 0;) {
        if (HTMLCollection[0] == undefined) {
            return;
        }
        HTMLCollection[0].remove();
    }
}

export function eraseInputValue(inputEl) {
    inputEl.value = "";
};

export function removeEqualOptionsFromSelect(select) {
    let selectOptions = select.getElementsByClassName('choices__item--choice');
    for (let selectOption of selectOptions) {
        selectOption.classList.remove('is-highlighted');

        if (select.querySelector('option').textContent == selectOption.textContent) {
            selectOption.remove();
        };
    }
}

export function getClientIdFromTable(tableRow) {
    return tableRow.getElementsByClassName('clients-table__cell_id')[0].textContent;
}