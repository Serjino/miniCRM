export async function getClients() {
    let response = await fetch(`http://ksvf.online:3000/api/clients`);
    let clients = await response.json();
    return clients;
};

export async function addClient(newClient) {
    let response = await fetch(`http://ksvf.online:3000/api/clients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newClient),
    });
    newClient = await response.json();
    return newClient;
};

export async function getClientById(id) {
    let response = await fetch(`http://ksvf.online:3000/api/clients/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    let clientByIdData = await response.json();
    return clientByIdData;
};

export async function deleteClient(id) {
    let response = await fetch(`http://ksvf.online:3000/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });

    let clientToChange = await response.json();
    return clientToChange;
};

export async function changeClient(client, id) {
    let response = await fetch(`http://ksvf.online:3000/api/clients/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(client),
    });
};
