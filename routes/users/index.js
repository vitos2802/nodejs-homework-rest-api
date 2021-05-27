const express = require('express')
const router = express.Router()
const {
  reg,
  login,
  logout,
  updateAvatar,
  verify,
  repeatEmailVerify,
} = require('../../controllers/users')
const {
  validationSignupUser,
  validationLoginUser,
  validationRepeatEmailVerify,
} = require('./validationUsersRouter')
const guard = require('../../helpers/guard')
const uploadAvatar = require('../../helpers/upload-avatar')

router.post('/register', validationSignupUser, reg)
router.post('/login', validationLoginUser, login)
router.post('/logout', guard, logout)

router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar)

router.get('/verify/:token', verify)
router.post('/verify', validationRepeatEmailVerify, repeatEmailVerify)

module.exports = router
