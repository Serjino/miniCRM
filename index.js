import { createTable } from './js/DOM-manipulation.js';
import { openAddClientForm, cancelUsingClientForm } from './js/btn-events.js';
import { saveClient, createNewContactRow, searchClient } from './js/btn-events.js';
import { options } from './js/objects.js';
import { getClients } from './js/server-req.js';
import { sort } from './js/sort.js';
import { checkClientNameValidity } from './js/form-validation.js';
import { colorActiveSortHeading } from './js/additional-features.js'

document.addEventListener('DOMContentLoaded', async function() {

    let addClientBtn = document.getElementById('addClientBtn');
    let clientForm = document.getElementById('addClientForm');
    let addNewContactBtn = document.getElementById('addNewContactBtn');
    let newContactsWrapper = document.getElementById('newContacts');
    let cancelBtn = document.getElementById('cancelBtn');
    let searchInput = document.getElementById('search');
    let idSortBtn = document.getElementById('idSortBtn');
    let clientNameSortBtn = document.getElementById('clientName');
    let creationDateTimeSortBtn = document.getElementById('creationDateTime');
    let lastChangeTimeSortBtn = document.getElementById('lastChangeTime');
    let clientNameInputs = document.getElementsByClassName('add-client-form__input');

    await createTable();

    addClientBtn.addEventListener('click', openAddClientForm)

    clientForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveClient();
    });

    addNewContactBtn.addEventListener('click', function (e) {
        newContactsWrapper.classList.add('new-contacts--active');
        let contacts = document.getElementsByClassName('new-contact__wrapper');
        let limitValueOfContacts = 10;

        if (contacts.length < limitValueOfContacts) {
            createNewContactRow(newContactsWrapper, options, )
        }
        else {
            alert('Не более 10 контактов на Клиента')
        }
    })

    cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cancelUsingClientForm();
    })

    searchInput.addEventListener ('input', function () {
        searchClient();
    });

    idSortBtn.addEventListener('click', async function (e) {
        let clients = await getClients();
        let sortArrow = this.getElementsByClassName('clients-table__sort-arrow')[0];

        colorActiveSortHeading(sortArrow);
        
        if (sortArrow.classList.contains('clients-table__sort-arrow_descend')) {
            sort(clients, 'descend', 'id', sortArrow);
            sortArrow.classList.remove('clients-table__sort-arrow_descend')
        }
        else {
            sort(clients, 'ascend', 'id', sortArrow);
            sortArrow.classList.add('clients-table__sort-arrow_descend')
        }
    });

    clientNameSortBtn.addEventListener('click', async function (e) {
        let clients = await getClients();
        let sortArrow = this.getElementsByClassName('clients-table__sort-arrow')[0];
        let sortArrowHeading = this.getElementsByClassName('clients-table__sort-arrow_heading')[0];

        colorActiveSortHeading(sortArrow);

        if (sortArrow.classList.contains('clients-table__sort-arrow_descend')) {
            sort(clients, 'descend', 'name', sortArrow);
            sortArrow.classList.remove('clients-table__sort-arrow_descend');
            sortArrowHeading.textContent = 'Я-А';
        }
        else {
            sort(clients, 'ascend', 'name', sortArrow);
            sortArrow.classList.add('clients-table__sort-arrow_descend');
            sortArrowHeading.textContent = 'А-Я';
        }
    });

    creationDateTimeSortBtn.addEventListener('click', async function (e) {
        let clients = await getClients();
        let sortArrow = this.getElementsByClassName('clients-table__sort-arrow')[0];

        colorActiveSortHeading(sortArrow);

        if (sortArrow.classList.contains('clients-table__sort-arrow_descend')) {
            sort(clients, 'descend', 'createdAt', sortArrow);
            sortArrow.classList.remove('clients-table__sort-arrow_descend')
        }
        else {
            sort(clients, 'ascend', 'createdAt', sortArrow);
            sortArrow.classList.add('clients-table__sort-arrow_descend')
        }
    });


    lastChangeTimeSortBtn.addEventListener('click', async function (e) {
        let clients = await getClients();
        let sortArrow = this.getElementsByClassName('clients-table__sort-arrow')[0];

        colorActiveSortHeading(sortArrow);

        if (sortArrow.classList.contains('clients-table__sort-arrow_descend')) {
            sort(clients, 'descend', 'updatedAt', sortArrow);
            sortArrow.classList.remove('clients-table__sort-arrow_descend')
        }
        else {
            sort(clients, 'ascend', 'updatedAt', sortArrow);
            sortArrow.classList.add('clients-table__sort-arrow_descend')
        }
    }); 

    for (let input of clientNameInputs) {
        let inputTimeout;
        let validRegexp = /^([А-Яа-яЁё]{2,})?\-{0,1}([А-Яа-яЁё]{2,})$/;
        input.addEventListener('keyup', function (){
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(function(){
                checkClientNameValidity(input, validRegexp);
            }, 300)
        })
    }

    document.addEventListener('touchmove', function(event) {
        event = event.originalEvent || event;
    
        if(event.scale > 1) {
            event.preventDefault();
        }
    }, false);

});



