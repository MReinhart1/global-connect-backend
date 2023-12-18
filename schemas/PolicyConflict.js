const mongoose = require("mongoose");

const PolicyConflict = new mongoose.Schema({
  globalPolicyID: {
    type: String,
    required: true
  },
  policy_id: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  element: {
    name: { type: String },
    NewValue: { type: String }
  },
  company_id: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PolicyConflict", PolicyConflict);
