const Transactions = require('../repositories/transactions')

// const fs = require('fs/promises')
// const path = require('path')
// const contacts = require('./transactions.json')

const listTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { docs: contacts, ...rest } = await Transactions.listContacts(
      userId,
      req.query
    )
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts, ...rest },
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
