const mongoose = require("mongoose");
const { username_validation, password_validation, email_validation } = require('./validations/user')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    validation: username_validation,
    required: true,
    unique: true
  },
  password: {
    type: String,
    validation: password_validation,
    required: true
  },
  email: {
    type: String,
    validation: email_validation,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    enum: ["Company", "Insurer"],
    required: true
  },
  country: {
    type: String,
    required: false
  },
  organization: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model("UserSchema", UserSchema);
