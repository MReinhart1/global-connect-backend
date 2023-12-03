const mongoose = require("mongoose");
const { password_validation, email_validation } = require('./validations/user')

const OrganizationSchema = new mongoose.Schema({
  country_id: {
    type: String,
    required: true
  },
  location_id: {
    type: String,
    required: true
  },
  company_id: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("OrganizationSchema", OrganizationSchema);
