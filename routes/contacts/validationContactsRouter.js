const Joi = require('joi')

const schemaCreatContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().optional(),
}).or('name', 'phone', 'email')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validation = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (error) {
    next({ status: 400, message: error.message })
  }
}

const validationCreatContact = async (req, res, next) => {
  return await validation(schemaCreatContact, req.body, next)
}

const validationUpdateContact = async (req, res, next) => {
  return await validation(schemaUpdateContact, req.body, next)
}

const validationUpdateStatusContact = async (req, res, next) => {
  return await validation(schemaUpdateStatusContact, req.body, next)
}

module.exports = {
  validationCreatContact,
  validationUpdateContact,
  validationUpdateStatusContact,
}
