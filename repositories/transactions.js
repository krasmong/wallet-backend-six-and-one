const Transaction = require('../model/transaction')
const {
  // getLastBalance,
  calculationCurrentBalance,
  // recalculationBalance,
} = require('../helpers/calculationBalance')

const listTransactions = async (userId) => {
  const results = await Transaction.find({ owner: userId })
  return results
}

// const listTransactions = async (userId, query) => {
//   const {
//     sortBy,
//     sortByDesk,
//     filter,
//     favorite = null,
//     limit = 20,
//     page = 1,
//   } = query

//   const optionsSearch = { owner: userId }
//   if (favorite !== null) {
//     optionsSearch.favorite = favorite
//   }
//   const results = await Transaction.paginate(optionsSearch, {
//     limit,
//     page,
//     sort: {
//       ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
//       ...(sortByDesk ? { [`${sortByDesk}`]: -1 } : {}),
//     },
//     select: filter ? filter.split('|').join(' ') : '',
//     populate: { path: 'owner', select: 'name email' },
//   })
//   return results
// }

const addTransaction = async (userId, body) => {
  const transactionList = await listTransactions(userId)
  let lastTransactionBalance = 0
  if (transactionList.length !== 0) {
    lastTransactionBalance = transactionList[transactionList.length - 1].balance
  }

  // console.log('47 lastTransactionBalance', lastTransactionBalance)

  if (lastTransactionBalance - body.amount < 0 && body.type === 'WITHDRAW') {
    const result = await Transaction.create({
      owner: userId,
      ...body,
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
    owner: userId,
    ...body,
    balance: currentBalance,
  })
  // recalculationBalance(body.date, currentBalance, userId)

  return result
}

module.exports = {
  listTransactions,
  addTransaction,
}
