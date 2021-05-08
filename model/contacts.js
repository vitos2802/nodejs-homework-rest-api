const fs = require('fs/promises')
const path = require('path')
// const contacts = require("./contacts.json");
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join('model', './contacts.json')
const readContacts = () =>
  fs.readFile(contactsPath).then((data) => JSON.parse(data.toString()))

const listContacts = async () => {
  return readContacts()
}

const getContactById = async (contactId) => {
  const contacts = await readContacts()
  const conditionId = Number(contactId) || contactId
  const findContact = contacts.find((contact) => contact.id === conditionId)
  return findContact
}

const removeContact = async (contactId) => {
  const contacts = await readContacts()
  const conditionId = Number(contactId) || contactId
  const contact = contacts.find((contact) => contact.id === conditionId)
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== conditionId
  )
  if (!filteredContacts) {
    console.log('Contact is not found!')
    return false
  }
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts))
  return contact
}

const addContact = async (body) => {
  const id = uuidv4()
  const contact = {
    id,
    ...body,
  }
  const contacts = await readContacts()
  contacts.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contact
}

const updateContact = async (contactId, body) => {
  const contacts = await readContacts()
  const conditionId = Number(contactId) || contactId
  const checkId = contacts.find((contact) => contact.id === conditionId)

  const updatedContact = {
    ...checkId,
    ...body,
  }
  const updateList = contacts.map((contact) => {
    if (contact.id === conditionId) {
      contact = updatedContact
    }
    return contact
  })

  await fs.writeFile(contactsPath, JSON.stringify(updateList))
  return updatedContact.id ? updatedContact : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
