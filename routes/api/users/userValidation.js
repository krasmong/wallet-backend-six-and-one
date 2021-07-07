const Joi = require('joi')
const mongoose = require('mongoose')

const passwordRegExp = '^[-\\.\\$\\#\\w]*$'

const schemaUserCreate = Joi.object({

  name: Joi.string()
    .min(1)
    .max(12)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 1, tlds: { allow: true } })
    .required(),

  password: Joi.string()
    .pattern(new RegExp(passwordRegExp))
    .min(6)
    .max(12)
    .required(),

  token: Joi.string()
    .token()
    .optional(),

})
  .with('email', 'password')

const schemaUserLogin = Joi.object({

  email: Joi.string()
    .email({ minDomainSegments: 1, tlds: { allow: true } })
    .required(),

  password: Joi.string()
    .pattern(new RegExp(passwordRegExp))
    .min(6)
    .max(12)
    .required(),

  token: Joi.string()
    .token()
    .optional(),

})
  .with('email', 'password')

const isMongoIdValid = (req, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    return next({
      status: 400,
      message: 'Invalid ObjectId',
    })
  };
  next()
}

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, '')
    })
  };
}

module.exports = {
  validateUserCreate: (req, res, next) => validate(schemaUserCreate, req.body, next),
  validateUserLogin: (req, res, next) => validate(schemaUserLogin, req.body, next),
  validateMongoId: (req, res, next) => isMongoIdValid(req, next)
}
