const mongoose = require("mongoose");
const { email_validation } = require('./validations/user')
const { country_id_validation } = require('./validations/policy')
const OrganizationSchema = new mongoose.Schema({
  country_id: {
    type: String,
    // validate: country_id_validation,
    // required: true
  },
  location_id: {
    type: String,
    required: false
  },
  company_id: {
    type: String,
    required: true,
    unique: true
  },
  deleted: {
    type: Boolean, 
    default: false
  },
  email: {
    type: String,
    required: true,
    validate: email_validation,
  },
}, { timestamps: true });

OrganizationSchema.index({country_id: 1, company_id: 1}, {unique: true})

module.exports = mongoose.model("OrganizationSchema", OrganizationSchema);
