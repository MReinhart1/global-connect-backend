const mongoose = require("mongoose");


const InvitationSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
    unique: true
  },
  admin_email: {
    type: String,
    required: true
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
});

module.exports = mongoose.model("InvitationSchema", InvitationSchema);
