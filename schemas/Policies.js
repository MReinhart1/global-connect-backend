const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')
const { TermSchema } = require('./Terms')
const { ExposureSchema } = require("./Exposures")
const { STATUS_CODES, WIP_REQUIREMENT, SUBMISSION_REQUIREMENT, QUOTE_REQUIREMENT, BIND_REQUIREMENT, POST_BIND_REQUIREMENT } = require('./constants/policy-status')
const { logger }  = require("../logger")

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

const PolicySchema = new mongoose.Schema({
  "globalPolicyID": {
    type: String,
    required: true
  },
  "creationEmail": {
    type: String,
    required: true
  },
  "status_name": {
    type: String,
    enum: ["WIP", "Submission", "Quote", "Bind", "Post Bind", "Rejected"],
    default: "WIP",
    required: true
  },
  "status_code": {
    type: Number,
    default: 0,
    required: true
  },
  "deleted": {
    type: Boolean, 
    default: false
  },
  "submission_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "1" },
    "Display_Name": { type: String, default: "Submission Id" },
    "Hover_Description": { type: String, default: "Local system's submission id" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "insured_name": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "2" },
    "Display_Name": { type: String, default: "Named Insured" },
    "Hover_Description": { type: String, default: "First named insured to appear on policy" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "insured_address": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "3" },
    "Display_Name": { type: String, default: "First named insured's mailing address" },
    "Hover_Description": { type: String, default: "null" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "riskmanager_id": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "4" },
    "Display_Name": { type: String, default: "Contact at Insured" },
    "Hover_Description": { type: String, default: "null" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "effective_dt": {
    "Value": { type: Date, required: [true, "effective_dt is required"]},
    "Sort_Order": { type: String, default: "5" },
    "Display_Name": { type: String, default: "Effective Date" },
    "Hover_Description": { type: String, default: "Inception date of policy" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "expiration_dt": {
    "Value": { type: Date, required: true },
    "Sort_Order": { type: String, default: "6" },
    "Display_Name": { type: String, default: "Expiration Date" },
    "Hover_Description": { type: String, default: "Expiration date of policy" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "country_id": {
    "Value": { type: String, validate: country_id_validation, required: true },
    "Sort_Order": { type: String, default: "7" },
    "Display_Name": { type: String, default: "Country Name" },
    "Hover_Description": { type: String, default: "ISO 3166 country names" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "carrier_id": {
    "Value": { type: String, required: true },
    "Sort_Order": { type: String, default: "8" },
    "Display_Name": { type: String, default: "Carrier Name" },
    "Hover_Description": { type: String, default: "Name of insurance issuing company" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "carrier_address": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "9" },
    "Display_Name": { type: String, default: "Carrier Address" },
    "Hover_Description": { type: String, default: "Mailing address of insurance issuing company" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "broker_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "10" },
    "Display_Name": { type: String, default: "Broker Name" },
    "Hover_Description": { type: String, default: "Name of broker of record on policy" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "broker_address": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "11" },
    "Display_Name": { type: String, default: "Broker Address" },
    "Hover_Description": { type: String, default: "Mailing address of broker of record" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "producer_id": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "12" },
    "Display_Name": { type: String, default: "Broker Contact" },
    "Hover_Description": { type: String, default: "Name of broker contact on policy" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "policy_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "13" },
    "Display_Name": { type: String, default: "Policy Type" },
    "Hover_Description": { type: String, default: "Type of policy (i.e. Master, Local, FOS-Master, FOS-Local)" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "prefix_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "14" },
    "Display_Name": { type: String, default: "Prefix" },
    "Hover_Description": { type: String, default: "Policy number prefix (if applicable)" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "policy_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "15" },
    "Display_Name": { type: String, default: "Policy#" },
    "Hover_Description": { type: String, default: "Default to TBD until bound and assigned" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "suffix_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "16" },
    "Display_Name": { type: String, default: "Suffix" },
    "Hover_Description": { type: String, default: "Policy number suffix (if applicable)" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "underwriter_id": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "17" },
    "Display_Name": { type: String, default: "Underwriter Contact" },
    "Hover_Description": { type: String, default: "null" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "lob_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "18" },
    "Display_Name": { type: String, default: "LoB" },
    "Hover_Description": { type: String, default: "Line of Business (see reference table)" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "product_txt": {
    "Value": { type: String  },
    "Sort_Order": { type: String, default: "19" },
    "Display_Name": { type: String, default: "Product" },
    "Hover_Description": { type: String, default: "Product name (e.g. package, etc. [if applicablex])" },
    "Category": { type: String, default: "Policy Details"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "gross_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "20" },
    "Display_Name": { type: String, default: "GWP" },
    "Hover_Description": { type: String, default: "Policy gross written premium" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "commission_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "21" },
    "Display_Name": { type: String, default: "Broker%" },
    "Hover_Description": { type: String, default: "Broker Commission %" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "tax_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "22" },
    "Display_Name": { type: String, default: "Taxes" },
    "Hover_Description": { type: String, default: "Taxes (not included in the premium) to be collected applicable to the policy" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "fee_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "23" },
    "Display_Name": { type: String, default: "Fees" },
    "Hover_Description": { type: String, default: "Fees (not included in the premium) to be collected applicable to the policy" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "surcharge_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "24" },
    "Display_Name": { type: String, default: "Surcharges" },
    "Hover_Description": { type: String, default: "Surcharges (not included in the premium) to be collected applicable to the policy" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "limit1_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "25" },
    "Display_Name": { type: String, default: "Limit Type" },
    "Hover_Description": { type: String, default: "Description of main policy limit (e.g. Occurence, AOP, Blanket, etc.)" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "limit1_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "26" },
    "Display_Name": { type: String, default: "Limit Amount" },
    "Hover_Description": { type: String, default: "Policy main limit amount" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "retention1_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "27" },
    "Display_Name": { type: String, default: "Retention Type" },
    "Hover_Description": { type: String, default: "Retained insured exposure type (e.g. deductible, retention, etc.)" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "retention1_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "28" },
    "Display_Name": { type: String, default: "Retention Amount" },
    "Hover_Description": { type: String, default: "Retained insured exposure amount" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "attach_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "29" },
    "Display_Name": { type: String, default: "Attachment Point" },
    "Hover_Description": { type: String, default: "Policy attachment point (if excess)" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "share_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "30" },
    "Display_Name": { type: String, default: "Share" },
    "Hover_Description": { type: String, default: "Insurer's share of limit (1-100%, if applicable)" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "trigger_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "31" },
    "Display_Name": { type: String, default: "Loss Trigger" },
    "Hover_Description": { type: String, default: "Loss trigger for claims (e.g. Occurence, Claims-Made, etc.)" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
  },
  "retro_dt": {
    "Value": { type: Date },
    "Sort_Order": { type: String, default: "32" },
    "Display_Name": { type: String, default: "Retro Date" },
    "Hover_Description": { type: String, default: "Policy retroactive date (applicable for claims-made policies)" },
    "Category": { type: String, default: "Gross Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "ripolicy_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "33" },
    "Display_Name": { type: String, default: "Certificate #" },
    "Hover_Description": { type: String, default: "Reinsurance certificate number" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "ripremium_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "34" },
    "Display_Name": { type: String, default: "RI Premium" },
    "Hover_Description": { type: String, default: "Reinsurance premium amount" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "ricommision_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "35" },
    "Display_Name": { type: String, default: "RI Commission" },
    "Hover_Description": { type: String, default: "Reinsurance cede commission" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "riattach_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "36" },
    "Display_Name": { type: String, default: "RI Attachment" },
    "Hover_Description": { type: String, default: "Reinsurance attachment point (if excess)" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "rilimit_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "37" },
    "Display_Name": { type: String, default: "RI Limit" },
    "Hover_Description": { type: String, default: "Amount of reinsurance coverage (limit amount)" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "riretention_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "38" },
    "Display_Name": { type: String, default: "RI Retention" },
    "Hover_Description": { type: String, default: "Primary insurer's retention amount" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "rishare_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "39" },
    "Display_Name": { type: String, default: "RI Share" },
    "Hover_Description": { type: String, default: "Reinsurer's share of limit (1-100%)" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "ritrigger_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "40" },
    "Display_Name": { type: String, default: "Reinsurance Loss Trigger" },
    "Hover_Description": { type: String, default: "Reinsurance loss trigger for claims (e.g. Occurence, Claims-Made, etc.)" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
  },
  "riretro_dt": {
    "Value": { type: Date },
    "Sort_Order": { type: String, default: "41" },
    "Display_Name": { type: String, default: "Reinsurance Retro Date" },
    "Hover_Description": { type: String, default: "Certificate retroactive date (applicable for claims-made policies)" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "security_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "42" },
    "Display_Name": { type: String, default: "Security" },
    "Hover_Description": { type: String, default: "Amount of collateral requested/required" },
    "Category": { type: String, default: "Reinsurance Declarations"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },
  "tpa_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "43" },
    "Display_Name": { type: String, default: "Claims" },
    "Hover_Description": { type: String, default: "Claim handling protocol (e.g. insurer, tpa, etc.)" },
    "Category": { type: String, default: "Other"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "authority_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "44" },
    "Display_Name": { type: String, default: "Authority Amount" },
    "Hover_Description": { type: String, default: "Claims handling approved settlement authority amount" },
    "Category": { type: String, default: "Other"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "billtype_id": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "45" },
    "Display_Name": { type: String, default: "Bill Type" },
    "Hover_Description": { type: String, default: "E.g. Local Broker Bill, Central Bill, Direct Bill, etc." },
    "Category": { type: String, default: "Other"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "roe_dt": {
    "Value": { type: Date },
    "Sort_Order": { type: String, default: "46" },
    "Display_Name": { type: String, default: "FX Date" },
    "Hover_Description": { type: String, default: "Rate of Exchange Date" },
    "Category": { type: String, default: "Other"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "location_id": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "47" },
    "Display_Name": { type: String, default: "Location #" },
    "Hover_Description": { type: String, default: "Location ID from SOV" },
    "Category": { type: String, default: "Exposures"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "location_address": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "48" },
    "Display_Name": { type: String, default: "Location Address" },
    "Hover_Description": { type: String, default: "Geocoded location address " },
    "Category": { type: String, default: "Exposures"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "sic_id": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "49" },
    "Display_Name": { type: String, default: "SIC" },
    "Hover_Description": { type: String, default: "Location exposure/occupancy risk classification code" },
    "Category": { type: String, default: "Exposures"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "basis_id": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "50" },
    "Display_Name": { type: String, default: "Exposure Basis Type" },
    "Hover_Description": { type: String, default: "Classification/type of exposure measure used" },
    "Category": { type: String, default: "Exposures"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "exposure_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "51" },
    "Display_Name": { type: String, default: "Exposure Amount" },
    "Hover_Description": { type: String, default: "Amount of exposure basis" },
    "Category": { type: String, default: "Exposures"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "per_amt": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "52" },
    "Display_Name": { type: String, default: "Per" },
    "Hover_Description": { type: String, default: "Rate of exposure basis used (i.e. per 1, per 100, per 1000, etc.)" },
    "Category": { type: String, default: "Exposures"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "order_nbr": {
    "Value": { type: Number },
    "Sort_Order": { type: String, default: "53" },
    "Display_Name": { type: String, default: "Order" },
    "Hover_Description": { type: String, default: "Order of forms/endorsements" },
    "Category": { type: String, default: "Terms"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "form_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "54" },
    "Display_Name": { type: String, default: "Form#" },
    "Hover_Description": { type: String, default: "Local company form id/number" },
    "Category": { type: String, default: "Terms"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "name_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "55" },
    "Display_Name": { type: String, default: "Form Name" },
    "Hover_Description": { type: String, default: "Title of form/endorsement" },
    "Category": { type: String, default: "Terms"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "description_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "56" },
    "Display_Name": { type: String, default: "Form Description" },
    "Hover_Description": { type: String, default: "Description of form coverage, limitation, exclusion, etc." },
    "Category": { type: String, default: "Terms"},
    "Editable": { type: Boolean, default: false },
    "Comments" : { type: [CommentsSchema] },
  },
  "schedule_txt": {
    "Value": { type: String },
    "Sort_Order": { type: String, default: "57" },
    "Display_Name": { type: String, default: "Schedule" },
    "Hover_Description": { type: String, default: "Variable data to be included in form schedule" },
    "Category": { type: String, default: "Terms"},
    "Editable": { type: Boolean, default: true },
    "Comments" : { type: [CommentsSchema] },
  },       
  comments: {
    type: [CommentsSchema]
  },
  Terms: {
    type: [TermSchema]
  },
  Exposures: {
    type: [ExposureSchema]
  }
}, { timestamps: true });


const REQUIREMENT_LIST = [WIP_REQUIREMENT, SUBMISSION_REQUIREMENT, QUOTE_REQUIREMENT, BIND_REQUIREMENT, POST_BIND_REQUIREMENT]

for (let requirementIndex = 0; requirementIndex < REQUIREMENT_LIST.length; requirementIndex++){
  for(let index = 0; index < REQUIREMENT_LIST[requirementIndex].length; index++){
    const validationFunction = function() {
      if (this.status_code == STATUS_CODES[Object.keys(STATUS_CODES)[requirementIndex]] && (this[`${REQUIREMENT_LIST[requirementIndex][index]}`].Value == "" || this[`${REQUIREMENT_LIST[requirementIndex][index]}`].Value == undefined || this[`${REQUIREMENT_LIST[requirementIndex][index]}`].Value == null)){
        throw new Error(`The ${this.policy_id.Value} policy in ${this.country_id.Value} requires a ${REQUIREMENT_LIST[requirementIndex][index]} value to be a ${this.status_name}`); 
      }
    }
    PolicySchema.paths[`${REQUIREMENT_LIST[requirementIndex][index]}.Value`].validators.push({validator: validationFunction})
  }
}

// Additional Validations
PolicySchema.paths[`policy_id.Value`].validators.push({validator: function() {
  if (this.policy_id.Value != "Master" && this.policy_id.Value != "Local"){
    throw new Error(`The ${this.policy_id.Value} policy in ${this.country_id.Value} requires a Master or Local policy_id, ${this.policy_id.Value} is invalid`)
  }
}})

PolicySchema.pre(['find', 'findOne', "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate"], function() {
  this._conditions = {...this._conditions, deleted: false}
});


PolicySchema.pre(['validate'], function() {
  if (this.status_name == "WIP"){
    this.status_code = STATUS_CODES['WIP']
  } else if (this.status_name == "Submission"){
    this.status_code = STATUS_CODES['Submission']
  } else if (this.status_name == "Quote"){
    this.status_code = STATUS_CODES['Quote']
  } else if (this.status_name == "Bind"){
    this.status_code = STATUS_CODES['Bind']
  } else if (this.status_name == "Post Bind"){
    this.status_code = STATUS_CODES['Post Bind']
  } else if (this.status_name == "Rejected"){
    this.status_code = 500
  } else {
    let newError = new Error(`This status does not exist: ${this.status_name}`)
    logger.log("error", newError)
  }
});

module.exports = mongoose.model("PolicySchema", PolicySchema);
