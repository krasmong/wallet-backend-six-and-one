const express = require('express')
const router = express.Router()

router.use('/transactions', require('./transactions'))
// router.use('/users', require('./users'))

module.exports = router
