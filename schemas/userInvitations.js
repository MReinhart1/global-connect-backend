const mongoose = require("mongoose");


const InvitationSchema = new mongoose.Schema({
  salutation: {
    type: String
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  user_email: {
    type: String,
    required: true,
    unique: true
  },
  manager_name: {
    type: String
  },
  company_id: {
    type: String,
    required: true,
  },
  country_id: {
    type: String,
    required: true,
  },
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

InvitationSchema.pre(['find', 'findOne', "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate"], function() {
  this._conditions = {...this._conditions, deleted: false}
});

module.exports = mongoose.model("InvitationSchema", InvitationSchema);
