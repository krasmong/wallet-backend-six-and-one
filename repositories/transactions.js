const Transaction = require('../model/transaction')
const { calculationCurrentBalance } = require('../helpers/calculationBalance')

// const listTransactions = async (userId) => {
//   const results = await Transaction.find({ owner: userId })
//   return results
// }

const listTransactions = async (userId, query) => {
  const { sortBy, sortByDesk, filter, limit = 10, page = 1 } = query

  const optionsSearch = { owner: userId }
  const results = await Transaction.paginate(optionsSearch, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesk ? { [`${sortByDesk}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: { path: 'owner', select: 'name email' },
  })
  return results
}

const categoryList = async (userId, body) => {
  const getTransactionList = await Transaction.find({ owner: userId })
  const result = [
    ...new Set(
      getTransactionList.map(({ category }) => {
        return category
      })
    ),
  ]
  return result
}

const addTransaction = async (userId, body) => {
  const getTransactionList = await Transaction.find({ owner: userId })
  let lastTransactionBalance = 0
  if (getTransactionList.length !== 0) {
    lastTransactionBalance =
      getTransactionList[getTransactionList.length - 1].balance
  }
  if (lastTransactionBalance - body.amount < 0 && body.type === 'WITHDRAW') {
    const result = await Transaction.create({
      ...body,
      owner: userId,
      type: 'CANCELED',
      balance: lastTransactionBalance,
    })
    return result
  }
  const currentBalance = await calculationCurrentBalance(
    lastTransactionBalance,
    body
  )
  const result = await Transaction.create({
    ...body,
    owner: userId,
    balance: currentBalance,
  })
  return result
}

module.exports = {
  listTransactions,
  categoryList,
  addTransaction,
}
