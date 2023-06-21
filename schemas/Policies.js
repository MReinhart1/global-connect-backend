const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')


// Numbers:
// min, max 
// Strings:  
// enum, match, minLength maxLength

const modificationsSchema = new mongoose.Schema({
  user: {
    type: String
  },
  elementName: {
    type: String,
  },
  previousValue: {
    type: mongoose.Schema.Types.Mixed,
  },
  nextValue: {
    type: mongoose.Schema.Types.Mixed,
  },
  date: {
    type: Date,
    default: new Date()
  }
})

const CommentsSchema =  new mongoose.Schema({
  user: {
    type: String
  },
  message: {
    type: String
  }
})

const PolicySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Uploaded", "Modified", "Accepted", "Rejected"],
    default: "Uploaded",
    required: true
  },
  modifications: {
    type: [modificationsSchema]
  },
  submission_txt: {
    type: String,
    required: false,
  },
  product_txt: {
    type: String,
    required: false,
  },
  policy_id: {
    type: String,
    required: false,
  },
  country_id: {
    type: String,
    required: false,
    validate: country_id_validation
  },
  carrier_id: {
    type: String,
    required: false,
  },
  carrier_address: {
    type: String,
    required: false,
  },
  broker_id: {
    type: String,
    required: false,
  },
  broker_address: {
    type: String,
    required: false,
  },
  insured_name: {
    type: String,
    required: false,
  },
  insured_address: {
    type: String,
    required: false,
  },
  prefix_txt: {
    type: String,
    required: false
  },
  policy_txt: {
    type: String,
    required: false,
  },
  suffix_txt: {
    type: String,
    required: false,
  },
  effective_dt: {
    type: Date,
    required: false,
  },
  expiration_dt: {
    type: Date,
    required: false,
  },
  underwriter_id: {
    type: String,
    required: false,
  },
  producer_id: {
    type: String,
    required: false,
  },
  riskmanager_id: {
    type: String,
    required: false,
  },
  lob_id: {
    type: String,
    required: false,
  },
  limit_id: {
    type: String,
    required: false,
  },
  limit_amt: {
    type: Number,
    min: [0, "Limit amount must me more than zero"],
    required: false,
  },
  retention_id: {
    type: String,
    required: false,
  },
  retention_amt: {
    type: Number,
    required: false,
  },
  attach_amt: {
    type: Number,
    required: false,
  },
  share_amt: {
    type: Number,
    required: false,
  },
  gross_amt: {
    type: Number,
    required: false,
  },
  commission_amt: {
    type: Number,
    required: false,
  },
  tax_amt: {
    type: Number,
    required: false,
  },
  fee_amt: {
    type: Number,
    required: false,
  },
  surcharge_amt: {
    type: Number,
    required: false,
  },
  rilimit_amt: {
    type: Number,
    required: false,
  },
  riretention_amt: {
    type: Number,
    required: false,
  },
  riattach_amt: {
    type: Number,
    required: false,
  },
  rishare_amt: {
    type: String,
    required: false,
  },
  ricommision_amt: {
    type: Number,
    required: false,
  },
  ripolicy_txt: {
    type: String,
    required: false,
  },
  ripremium_amt: {
    type: Number,
    required: false,
  },
  billtype_id: {
    type: String,
    required: false,
  },
  tpa_id: {
    type: String,
    required: false,
  },
  authority_amt: {
    type: Number,
    required: false,
  },
  security_amt: {
    type: Number,
    required: false,
  },
  comments: {
    type: [CommentsSchema]
  }
});

const PoliciesSchema = new mongoose.Schema({
  Policies: {
    type: [PolicySchema],
    required: false,
  },
  companyName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("PoliciesSchema", PoliciesSchema);
