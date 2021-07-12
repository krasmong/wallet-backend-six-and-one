const Transaction = require('../model/transaction')

// const listTransactions = async () => {
//   const results = await Transaction.find()
//   return results
// }

const listTransactions = async (userId, query) => {
  const {
    sortBy,
    sortByDesk,
    filter,
    favorite = null,
    limit = 20,
    page = 1,
  } = query

  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const results = await Transaction.paginate(optionsSearch, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesk ? { [`${sortByDesk}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: { path: 'owner', select: 'name email subscription' },
  })
  return results
}

const addTransaction = async (userId, body) => {
  // const lastTransactionBalance =
  // const currentBalance =
  const result = await Transaction.create({
    owner: userId,
    ...body,
    balance: 0,
  })
  return result
}

module.exports = {
  listTransactions,
  addTransaction,
}
