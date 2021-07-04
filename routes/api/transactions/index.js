const express = require('express')
const router = express.Router()
// const Transactions = require('../../model')
// const {
//   validationCreateTransaction,
//   validationUpdateTransaction,
// } = require('./validation')

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

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
