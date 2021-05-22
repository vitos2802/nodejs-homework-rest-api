const express = require('express')
const router = express.Router()
const {
  getListContacts,
  contactById,
  remove,
  update,
  updateStatus,
  createContact,
} = require('../../controllers/contacts')

const {
  validationCreatContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./validationContactsRouter')
const guard = require('../../helpers/guard')

router.get('/', guard, getListContacts)

router.get('/:contactId', guard, contactById)

router.post('/', guard, validationCreatContact, createContact)

router.delete('/:contactId', guard, remove)

router.put('/:contactId', guard, validationUpdateContact, update)

router.patch(
  '/:contactId/favorite',
  guard,
  validationUpdateStatusContact,
  updateStatus
)

module.exports = router
