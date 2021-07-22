const { model, Schema, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const transactionSchema = new Schema(
  {
    // date: {
    //   type: String,
    //   required: true,
    // },

    // date: {
    //   day: { type: String, required: true },
    //   month: { type: String, required: true },
    //   year: { type: String, required: true },
    // },

    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    type: {
      type: String,
      enum: ['DEPOSIT', 'WITHDRAW', 'CANCELED'],
      default: 'WITHDRAW',
    },
    category: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      maxLength: 80,
      default: '',
    },
    amount: {
      type: Number,
      min: 0,
      required: [true, 'Amount of transaction is required'],
    },
    balance: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    // toObject: { virtuals: true },
  }
)
// transactionSchema.virtual('info').get(function () {
//   return `Transaction details of user: ${this.owner}: balance: ${this.balance}, type: ${this.type}, category: ${this.category}, comment: ${this.comment}, amount: ${this.amount} ,`
// })

transactionSchema.path('comment').validate((value) => {
  const re = /^[а-яА-ЯёЁa-zA-Z0-9 ]+$/g
  return re.test(String(value).toLowerCase())
})

transactionSchema.plugin(mongoosePaginate)

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
