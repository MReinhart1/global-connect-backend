const mongoose = require("mongoose");
const { password_validation, email_validation } = require('./validations/user')

const OrganizationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("OrganizationSchema", OrganizationSchema);
