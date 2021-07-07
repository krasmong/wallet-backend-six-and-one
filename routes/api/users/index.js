const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const {
  validateUserCreate,
  validateUserLogin,
} = require('./userValidation')

router.post('/signup', validateUserCreate, ctrl.register)
router.post('/login', validateUserLogin, ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.get('/current', guard, ctrl.current)

module.exports = router
