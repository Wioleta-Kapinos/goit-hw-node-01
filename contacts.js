const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
    await fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => console.table(contacts))
    .catch((error) => console.log(error.message));
}
async function listContacts() {
    const beginTime = new Date().getTime();

    await readContacts();
    const finishTime = new Date().getTime();
    console.log(`Execution time: ${finishTime - beginTime} ms.`);
}

async function getContactById(contactId) {
    const beginTime = new Date().getTime();

    await fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.find((contact) => contact.id === contactId))
    .then((contact) => console.table(contact))
    .catch((error) => console.log(error.message));

    const finishTime = new Date().getTime();
    console.log(`Execution time: ${finishTime - beginTime} ms.`);
}

async function addContact(name, email, phone) {
    const beginTime = new Date().getTime();
    const newContact = {  id: Date.now().toString(), name, email, phone};

    const contacts = await fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((error) => console.log(error.message));

    await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]))
    .catch((error) => console.log(error.message));

    await readContacts();
    const finishTime = new Date().getTime();
    console.log(`Execution time: ${finishTime - beginTime} ms.`);
}

async function removeContact(contactId) {
    const beginTime = new Date().getTime();

    const contacts = await fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((error) => console.log(error.message));

    const filteredContact = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContact))
    .catch((error) => console.log(error.message));

    await readContacts();
    const finishTime = new Date().getTime();
    console.log(`Execution time: ${finishTime - beginTime} ms.`);
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}