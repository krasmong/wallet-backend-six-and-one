const TransactionCategory = require('../model/transactionCategory')

const addTransactionCat = async (userId, body) => {
  const getTransactionCategoryList = await (await TransactionCategory.find({ owner: userId })).map(({ category }) => category)
  console.log(getTransactionCategoryList)
  if (getTransactionCategoryList.indexOf(body.category) === -1) {
    console.log(body.category)
    const category = body.category
    const result = TransactionCategory.create({
      category,
      owner: userId
    })
    return result
  }
}

const getCategoryList = async (userId) => {
  const results = await TransactionCategory.find({ owner: userId })
  return results
}

module.exports = {
  // listTransactions,
  getCategoryList,
  addTransactionCat,
}
