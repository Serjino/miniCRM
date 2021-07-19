import { deleteElements, createTableRow } from './DOM-manipulation.js';

export async function sort(array, ascendOrDescend, typeOfValues) {
    let tr = document.getElementsByClassName('clients-table__row');
    let sortedMassive;
    
    if (ascendOrDescend == 'descend') {
        if (typeOfValues == 'name') {
            sortedMassive = array.sort(function (a, b) {
                let fullNameA = `${a.surname}` + `${a.name}` + `${a.lastName}`;
                let fullNameB = `${b.surname}` + `${b.name}` + `${b.lastName}`;
                if (fullNameA > fullNameB) return -1;
                if (fullNameA == fullNameB) return 0;
                if (fullNameA < fullNameB) return 1;
            });
        }
        else {
            sortedMassive = array.sort(function (a, b) {
                if (a[typeOfValues] > b[typeOfValues]) return -1;
                if (a[typeOfValues] == b[typeOfValues]) return 0;
                if (a[typeOfValues] < b[typeOfValues]) return 1;
            });
        }
    }
    else if (ascendOrDescend == 'ascend') {
        if (typeOfValues == 'name') {
            sortedMassive = array.sort(function (a, b) {
                let fullNameA = `${a.surname}` + `${a.name}` + `${a.lastName}`;
                let fullNameB = `${b.surname}` + `${b.name}` + `${b.lastName}`;
                if (fullNameA > fullNameB) return 1;
                if (fullNameA == fullNameB) return 0;
                if (fullNameA < fullNameB) return -1;
            });
        }
        else {
            sortedMassive = array.sort(function (a, b) {
                if (a[typeOfValues] > b[typeOfValues]) return 1;
                if (a[typeOfValues] == b[typeOfValues]) return 0;
                if (a[typeOfValues] < b[typeOfValues]) return -1;
            });
        }
    }

    deleteElements(tr);

    for (let i = 0; i < sortedMassive.length; i++) {
        createTableRow(sortedMassive[i]);
    };
}