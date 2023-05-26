const readContacts = async () => {
  const contacts = await fs.readFile(__dirname + "/../db/contacts.json");
  return JSON.parse(contacts);
};

const addContactToFile = async (contact) => {
  const contacts = await readContacts();
  contacts.push(contact);
  await fs.writeFile(
    __dirname + "/../db/contacts.json",
    JSON.stringify(contacts, null, 2)
  );
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((item) => item.id === id);
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(
    __dirname + "/../db/contacts.json",
    JSON.stringify(contacts, null, 2)
  );
};

const removeContact = async (id) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((item) => item.id === id);
  contacts.splice(index, 1);
  await fs.writeFile(
    __dirname + "/../db/contacts.json",
    JSON.stringify(contacts, null, 2)
  );
};
