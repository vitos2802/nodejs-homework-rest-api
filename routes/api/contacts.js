const express = require('express')
const router = express.Router()
const {
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  addContact,
  updateStatusContact,
} = require('../../model/contacts.js')
const { HttpCode } = require('../../helpers/constants')
const {
  validationCreatContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('./validation/validationContactsRouter')

const handleError = require('../../helpers/handle-error')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  validationCreatContact,
  handleError(async (req, res, next) => {
    const contact = await addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    })
  })
)

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'contact deleted',
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.patch(
  '/:contactId/favorite',
  validationUpdateStatusContact,
  async (req, res, next) => {
    try {
      const contact = await updateStatusContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({
          status: 'success',
          code: HttpCode.OK,
          data: {
            contact,
          },
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          data: 'Not Found',
        })
      }
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
