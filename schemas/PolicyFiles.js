const mongoose = require("mongoose");
const { password_validation, email_validation } = require('./validations/user')


const CommentsSchema =  new mongoose.Schema({
  email: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const PolicyFilesSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  country_id: {
    type: String,
    required: true
  },
  company_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validation: email_validation,
    required: true,
  },
  policy_id: {
    type: String,
    required: true
  },
  effective_dt: {
    type: Date
  },
  action: {
    type: String,
    enum:  ["Binder/Certificate Issued", "Instructions Issued", "Invoice Issued", "Compliance Form Requested", "Compliance Form Received", "Policy Issued", "Premium Collected", "Engineering Requested", "Engineering Completed", "Large Loss Reported", "Large Loss Approved", "Endorsement Requested", "Endorsement Issued"],
    required: true
  },
  value:
  {
    type: String,
    required: true
  },
  comments : {
    type: [CommentsSchema]
  },
  globalPolicyID: {
    type: String,
    required: [true, "The global policy ID must be sent in the request"]
  },
  S3FilePath: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean, 
    default: false
  },
}, { timestamps: true });

PolicyFilesSchema.index({globalPolicyID: 1})
PolicyFilesSchema.index({policy_id: 1})


PolicyFilesSchema.pre(['find', 'findOne', "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate"], function() {
  this._conditions = {...this._conditions, deleted: false}
});


module.exports = mongoose.model("PolicyFilesSchema", PolicyFilesSchema);

 