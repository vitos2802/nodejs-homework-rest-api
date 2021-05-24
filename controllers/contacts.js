const {
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  addContact,
  updateStatusContact,
} = require('../model/contacts.js')
const { HttpCode } = require('../helpers/constants')

const getListContacts = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contacts = await listContacts(userId, req.query)
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
}

const contactById = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await getContactById(userId, req.params.contactId)
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

const createContact = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await addContact(userId, req.body)
    return res.status(201).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await removeContact(userId, req.params.contactId)
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
}

const update = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await updateContact(userId, req.params.contactId, req.body)
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

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await updateStatusContact(
      userId,
      req.params.contactId,
      req.body
    )
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

module.exports = {
  getListContacts,
  contactById,
  remove,
  updateStatus,
  update,
  createContact,
}
