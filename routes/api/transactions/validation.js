const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateTransaction = Joi.object({
  date: Joi.string().required(),
  type: Joi.string().required(),
  category: Joi.string().required(),
  comment: Joi.string().alphanum().min(3).max(80).required(),
  amount: Joi.number().integer().min(1).max(9999999999).required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ''),
    })
  }
}

module.exports = {
  validationCreateTransaction: (req, res, next) => {
    if (
      !req.body.type ||
      !req.body.category ||
      !req.body.comment ||
      !req.body.amount
    ) {
      return res.status(400).json({
        status: 'fail',
        code: 400,
        massage: 'missing required name field',
      })
    }
    return validate(schemaCreateTransaction, req.body, next)
  },

  validationMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.transactionId)) {
      return next({
        status: 400,
        message: 'invalid ObjectId',
      })
    }
    next()
  },
}
