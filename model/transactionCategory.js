const { Schema, model, SchemaTypes } = require('mongoose')

const transactionCategorySchema = new Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
})

const TransactionCategorySchema = model('transactionCategory', transactionCategorySchema)

module.exports = TransactionCategorySchema
