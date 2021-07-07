const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
// const guard = require('../../helpers/guard')
const {
  validateUserCreate,
  validateUserLogin,
  validateMongoId
} = require('./userValidation')

// router.post('/signup', validateUser, ctrl.register)
// router.post('/login', validateUser, ctrl.login)
// router.post('/logout', guard, ctrl.logout)
// router.get('/current', guard, ctrl.current)

router.post('/signup', validateUserCreate, ctrl.register)
router.post('/login', validateUserLogin, ctrl.login)
router.post('/logout', validateMongoId, ctrl.logout)
router.get('/current', validateMongoId, ctrl.current)

module.exports = router
