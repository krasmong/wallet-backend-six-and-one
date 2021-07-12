const { model, Schema, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const transactionSchema = new Schema(
  {
    time_id: {
      type: Number,
      default: Date.now(),
    },
    date: {
      type: String,
      required: true,
    },
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
      enum: [
        'MAIN',
        'MEAL',
        'AUTO',
        'DEVELOPMENT',
        'CHILDREN',
        'HOME',
        'EDUCATION',
        'OTHER',
      ], // але не впевнений, що тут enum, мені здається це має бути поле, куди записуються всі значення, які вводив user (повтори відловлюються) а потім відображаються як масив введених значень, тобто має бути можливість вводу
      default: 'MAIN',
    },
    comment: {
      type: String,
      maxLength: 80,
      default: '',
    },
    amount: {
      type: Number,
      required: [true, 'Amount of transaction is required'],
    },
    balance: {
      type: Number,
      min: 0,
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
    toObject: { virtuals: true },
  }
)
transactionSchema.virtual('info').get(function () {
  return `Transaction details of user ${this.owner}: ${this.time_id}, type: ${this.type}, category: ${this.category}, comment: ${this.comment}, amount: ${this.amount} , balance: ${this.balance}`
})

transactionSchema.path('comment').validate((value) => {
  const re = /^[а-яА-ЯёЁa-zA-Z0-9]+$/g
  return re.test(String(value).toLowerCase())
})

transactionSchema.plugin(mongoosePaginate)

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
