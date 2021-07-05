const express = require('express')
const router = express.Router()

const controller = require('../../../controllers/transactions')

// const Transactions = require('../../model')
// const {
//   validationCreateTransaction,
//   validationUpdateTransaction,
// } = require('./validation')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', controller.listTransactions)

router.get('/:transactionId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:transactionId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:transactionId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
