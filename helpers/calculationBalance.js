// const Transaction = require('../model/transaction')

// const getLastBalance = async (createdAt, userId) => {
//   const lastTransaction = await Transaction.find({
//     date: { $lt: createdAt },
//     owner: userId,
//   })
//     .sort({ createdAt: -1 })
//     .limit(1)
//   if (!lastTransaction || lastTransaction.length === 0) {
//     return 0
//   } else return lastTransaction[0].balance
// }

const calculationCurrentBalance = (balance, body) => {
  if (body.type === 'DEPOSIT') {
    return balance + body.amount
  }
  if (body.type === 'WITHDRAW') {
    return balance - body.amount
  }
}

// const recalculationBalance = async (date, currentBalance, userId) => {
//   const balance = currentBalance
//   const transaction = await Transaction.find({
//     date: { $gt: date },
//     owner: userId,
//   })

//   const sortedTransactions = sortByDate(transaction)

//   sortedTransactions.forEach((el) => {
//     balance = calculationCurrentBalance(balance, el)
//     Transaction.updateOne({ _id: el.id }, { balance: balance }, function (err) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log('Success update')
//       }
//     })
//   })
// }

// const sortByDate = (transactions) => {
//   return transactions.sort(function (a, b) {
//     if (a.date > b.date) {
//       return 1
//     }
//     if (a.date < b.date) {
//       return -1
//     }
//     return 0
//   })
// }

module.exports = {
  calculationCurrentBalance,
  // recalculationBalance,
}
