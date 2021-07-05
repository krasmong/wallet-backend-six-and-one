const Transactions = require('../repositories/transaction')

// const fs = require('fs/promises')
// const path = require('path')
// const contacts = require('./transactions.json')

const listTransactions = async (req, res, next) => {
  console.log('Hi')
  try {
    const contacts = await Transactions.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
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
