const mongoose = require("mongoose");
const { password_validation, email_validation } = require('./validations/user')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
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
  },
  company: {
    type: String,
  },
  // timestamps: true,
  occupation: {
    type: String,
    enum: ["Client", "Broker", "Auditor", "Underwriter", "Manager", "Administrator"],
    default: "Underwriter",
    required: true
  },
  deleted: {
    type: Boolean, 
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model("UserSchema", UserSchema);
