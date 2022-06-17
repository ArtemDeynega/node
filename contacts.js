const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");
const update = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// TODO: задокументировать каждую функцию
//Усі контакти
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};
//Пошук одного контакта по ID
const getContactById = async (contactID) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactID);
  if (!result) {
    return null;
  }
  return result;
};

//Оновлення контакту
const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  update(contacts);
  return contacts[idx];
};

//Додавання контакту
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };
  contacts.push(newContact);
  update(contacts);
  return newContact;
};

//Видалення контакту
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  update(contacts);
  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
