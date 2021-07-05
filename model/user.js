const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate(value) {
      const re = /[A-Za-zА-Яа-яЁёЄє']/g;
      return re.test(String(value));
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/g;
      return re.test(String(value).toLowerCase());
    },
  },
  token: {
    type: String,
    default: null,
  },
});

const UserSchema = model("user", userSchema);

module.exports = UserSchema;