const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')

const PolicySchema = new mongoose.Schema({
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
    required: false,
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
    type: String,
    required: false,
  },
  expiration_dt: {
    type: String,
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
    type: String,
    required: false,
  },
  retention_id: {
    type: String,
    required: false,
  },
  retention_amt: {
    type: String,
    required: false,
  },
  attach_amt: {
    type: String,
    required: false,
  },
  share_amt: {
    type: String,
    required: false,
  },
  gross_amt: {
    type: String,
    required: false,
  },
  commission_amt: {
    type: String,
    required: false,
  },
  tax_amt: {
    type: String,
    required: false,
  },
  fee_amt: {
    type: String,
    required: false,
  },
  surcharge_amt: {
    type: String,
    required: false,
  },
  rilimit_amt: {
    type: String,
    required: false,
  },
  riretention_amt: {
    type: String,
    required: false,
  },
  riattach_amt: {
    type: String,
    required: false,
  },
  rishare_amt: {
    type: String,
    required: false,
  },
  ricommision_amt: {
    type: String,
    required: false,
  },
  ripolicy_txt: {
    type: String,
    required: false,
  },
  ripremium_amt: {
    type: String,
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
    type: String,
    required: false,
  },
  security_amt: {
    type: String,
    required: false,
  },
});

const PolicysSchema = new mongoose.Schema({
  policy: {
    type: [PolicySchema],
    required: false,
  },
  companyName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Policy", PolicysSchema);
