const Joi = require('joi')

const schemaSignupUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).max(20).required(),
})

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).max(20).required(),
})

const validation = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (error) {
    next({ status: 400, message: error.message })
  }
}

const validationSignupUser = async (req, res, next) => {
  return await validation(schemaSignupUser, req.body, next)
}

const validationLoginUser = async (req, res, next) => {
  return await validation(schemaLoginUser, req.body, next)
}

module.exports = { validationSignupUser, validationLoginUser }
