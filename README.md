# miniCRM

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This miniCRM is a result of diploma thesis of JavaScript education course at Skillbox.
It is based on Node.js emulated server, which was build by school mentioned before.
My task was to make all frontend components and configure data exchange with server.
All backend part ('/crm-backend') was made by Skillbox's command.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


To start testing, follow the instructions below:
1. Open terminal
2. Go to '/crm-backend' directory, and use command 'node index.js' to emulate server.
3. If server successfully launched, terminal show the next message:

=====

"Server CRM is launched. You can use it by click on the following link http://localhost:3000
Press CTRL+C, to stop the server
Available methods:
GET /api/clients - get client's list, also you can use 'search' as query paramether
POST /api/clients - to create a Client, you need to send with request body an object, 
which has the following structure: { name: string, surname: string, lastName?: string, contacts?: object[] }
contacts - massive with objects, that includes contacts of the following structure { type: string, value: string }
GET /api/clients/{id} - get Client by ID
PATCH /api/clients/{id} - to change Client by ID, you need to send with request body an object, 
which has the following structure: { name?: string, surname?: string, lastName?: string, contacts?: object[] }
contacts -  massive with objects, that includes contacts of the following structure { type: string, value: string }
DELETE /api/clients/{id} - delete Client By ID"

======

4. Than separatly open directly '/frontend' directory , and launch 'index.html', using LiveServer extension in your IDE. 
This needs to get the correct experience from testing, and to avoid page reloading after using API requests.

I hope you will enjoy it. Thank you for your attention, and i will be really appreciated, 
if you leave a feedback by any possible way.
