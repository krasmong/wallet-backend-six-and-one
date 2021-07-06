const Transactions = require('../repositories/transactions')

// const fs = require('fs/promises')
// const path = require('path')
// const contacts = require('./transactions.json')

const listTransactions = async (req, res, next) => {
  console.log('Hi')
  try {
    const transactions = await Transactions.listTransactions()
    return res.json({
      status: 'success',
      code: 200,
      data: { transactions },
    })
  } catch (e) {
    next(e)
  }
}

const getTransactionById = async (transactionId) => {}

const removeTransaction = async (transactionId) => {}

const addTransaction = async (body) => {}

const updateTransaction = async (transactionId, body) => {}

module.exports = {
  listTransactions,
  getTransactionById,
  removeTransaction,
  addTransaction,
  updateTransaction,
}
