const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with this not found`);
      }
      return console.log(contactById);

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(
        `Contact with id ${id} was removed from the contact list`
      );

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
