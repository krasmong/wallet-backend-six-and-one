const Transactions = require('../repositories/transactions')

const listTransactions = async (req, res, next) => {
  console.log('Hi')
  try {
    const userId = req.user.id
    const { docs: transactions, ...rest } = await Transactions.listTransactions(
      userId,
      req.query
    )
    return res.json({
      status: 'success',
      code: 200,
      data: { transactions, ...rest },
    })
  } catch (e) {
    next(e)
  }
}

const addTransaction = async (req, res, next) => {
  try {
    const userId = req.user.id
    const transaction = await Transactions.addTransaction(userId, req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { transaction },
    })
  } catch (e) {
    if (e.date === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}

const categoryList = async (req, res, next) => {
  try {
    const userId = req.user.id
    console.log('41 result', userId)
    const transactionList = await Transactions.listTransactions(userId)
    console.log('43 result', transactionList)
    const result = transactionList.map(({ category }) => {
      return category
    })
    console.log('46 result', result)

    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
    })
  } catch (e) {
    if (e.date === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}

const getTransactionById = async (transactionId) => {}

// const removeTransaction = async (transactionId) => {}

// const updateTransaction = async (transactionId, body) => {}

module.exports = {
  listTransactions,
  addTransaction,
  getTransactionById,
  categoryList,
}
