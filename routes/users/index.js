const express = require('express')
const router = express.Router()
const { reg, login, logout, updateAvatar } = require('../../controllers/users')
const {
  validationSignupUser,
  validationLoginUser,
} = require('./validationUsersRouter')
const guard = require('../../helpers/guard')
const uploadAvatar = require('../../helpers/upload-avatar')

router.post('/register', validationSignupUser, reg)
router.post('/login', validationLoginUser, login)
router.post('/logout', guard, logout)

router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar)

module.exports = router
