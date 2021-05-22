const express = require('express')
const router = express.Router()
const { reg, login, logout } = require('../../controllers/users')
const {
  validationSignupUser,
  validationLoginUser,
} = require('./validationUsersRouter')
const guard = require('../../helpers/guard')

router.post('/register', validationSignupUser, reg)
router.post('/login', validationLoginUser, login)
router.post('/logout', guard, logout)

module.exports = router
