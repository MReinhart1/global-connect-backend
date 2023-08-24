const mongoose = require("mongoose");
const { password_validation, email_validation } = require('./validations/user')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    validation: email_validation,
    required: true,
    unique: true
  },
  password: {
    type: String,
    validation: password_validation,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("UserSchema", UserSchema);
