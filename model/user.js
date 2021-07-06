const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 9

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate(value) {
      const re = /[A-Za-zА-Яа-яЁёЄє']/g
      return re.test(String(value))
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/g
      return re.test(String(value).toLowerCase())
    },
  },
  token: {
    type: String,
    default: null,
  },
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const UserSchema = model('user', userSchema)

module.exports = UserSchema
