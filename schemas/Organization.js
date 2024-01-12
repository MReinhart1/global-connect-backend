const mongoose = require("mongoose");
const { password_validation, email_validation } = require('./validations/user')

const OrganizationSchema = new mongoose.Schema({
  country_id: {
    type: String,
    required: true
  },
  location_id: {
    type: String,
    required: false
  },
  company_id: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean, 
    default: false
  },
  inbox: {
    type: String
  },
}, { timestamps: true });

OrganizationSchema.index({country_id: 1, company_id: 1}, {unique: true})

module.exports = mongoose.model("OrganizationSchema", OrganizationSchema);
