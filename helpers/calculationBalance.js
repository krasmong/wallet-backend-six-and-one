const Transaction = require('../model/transaction')

const getLastBalance = async (date, userId) => {
  const lastTransaction = await Transaction.find({
    date: { $lt: date },
    owner: userId,
  })
    .sort({ date: -1 })
    .limit(1)
  if (!lastTransaction || lastTransaction.length === 0) {
    return 0
  } else return lastTransaction[0].balance
}

const calculationCurrentBalance = (balance, body) => {
  if (body.type === 'DEPOSIT') {
    return parseInt(balance + body.amount)
  }
  if (body.type === 'WITHDRAW') {
    return parseInt(balance - body.amount)
  }
}

const recalculationBalance = async (date, currentBalance, userId) => {
  const balance = currentBalance
  const transaction = await Transaction.find({
    date: { $gt: date },
    owner: userId,
  })
}

module.exports = {
  getLastBalance,
  calculationCurrentBalance,
  recalculationBalance,
}
