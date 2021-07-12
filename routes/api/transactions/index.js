const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/transactions')
const guard = require('../../../helpers/guard')

const { validationCreateTransaction } = require('./validation')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router
  .get('/', guard, controller.listTransactions)
  .post('/', guard, validationCreateTransaction, controller.addTransaction)

router.get('/:transactionId', controller.getTransactionById)

module.exports = router
