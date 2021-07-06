const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
// const guard = require('../../helpers/guard')
// const {
//   validateUser,
// } = require('../../validation/userValidation')

// router.post('/signup', validateUser, ctrl.register)
// router.post('/login', validateUser, ctrl.login)
// router.post('/logout', guard, ctrl.logout)
// router.get('/current', guard, ctrl.current)

router.post('/signup', ctrl.register)
router.post('/login', ctrl.login)
router.post('/logout', ctrl.logout)
router.get('/current', ctrl.current)

module.exports = router
