const contacts = require("./contacts");
const { program } = require("commander");
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const result = await contacts.listContacts();
      console.table(result);
      break;
    case "get":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;
    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      break;

    case "updateById":
      const updateContact = await contacts.updateContact(
        id,
        name,
        email,
        phone
      );
      console.table(updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
