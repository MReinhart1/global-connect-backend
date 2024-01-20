const mongoose = require("mongoose");


const CommentsSchema =  new mongoose.Schema({
  email: {
    type: String
  },
  message: {
    type: String
  },
  localUnderwriter: {
    type: Boolean
  },
}, { timestamps: true })

const ChangesSchema = new mongoose.Schema({
  policyElementName: { type: String },
  previousValue: { type: mongoose.Schema.Types.Mixed },
  currentValue: { type: mongoose.Schema.Types.Mixed },
  comments: [CommentsSchema]
})

const PolicyConflict = new mongoose.Schema({
  globalPolicyID: {
    type: String,
    required: true
  },
  policyID: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean
  },
  company_id: {type: String},
  country_id: {type: String},
  email: {
    type: email
  },
  changes: [ChangesSchema],
  deleted: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

PolicyConflict.pre(['find', 'findOne', "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate"], function() {
  this._conditions = {...this._conditions, deleted: false}
});


module.exports = mongoose.model("PolicyConflict", PolicyConflict);
