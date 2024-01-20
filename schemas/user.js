const mongoose = require("mongoose");
const { password_validation, email_validation } = require('./validations/user')

const UserSchema = new mongoose.Schema({
  salutation: {
    type: String
  },
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
    // unique: true
  },
  mobile: {
    type: String
  },
  password: {
    type: String,
    validation: password_validation,
    required: true
  },
  country_id: {
    type: String,
  },
  company_id: {
    type: String,
  },
  manager: {
    type: String
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

