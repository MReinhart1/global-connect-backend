var express = require('express');
var router = express.Router();
const PoliciesSchema = require("../../schemas/Policies")
const TermsSchema = require("../../schemas/Terms")
const ExposuresSchema = require("../../schemas/Exposures")
const User = require('../../schemas/user')
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email');
const { STATES } = require('mongoose');
const jwt = require('jsonwebtoken')

// Routes 
// Get all policies for your company or that are for your country 
// Get your master policy by GlobalID
// Get terms and exposures by globalID for your master policy
// Get terms and exposures for other companies local policy 

const editFields = [
    { name: "attach_amt", displayName: "Attachment Point", description: "Policy attachment point (if excess)"},
    { name: "fee_amt", displayName: "Fees", description: "Any applicable to the policy (outside of premiums)"},
    { name: "gross_amt" , displayName: "GWP", description: "Total policy gross written premium" },
    { name: "limit1_amt", displayName: "Limit Amount", description: "Main limit amount"},
    { name: "policy_txt", displayName: "Policy#", description: "Default to TBD until assigned"},
    { name: "prefix_txt", displayName: "Prefix", description: "Prefix"},
    { name: "retention1_amt", displayName: "Retention Amount", description: "Main coverage deductible/retention"},
    { name: "riattach_amt", displayName: "RI Attachment", description: "Reinsurance attachment point if excess"},
    { name: "ricommision_amt", displayName: "RI Commission", description: "Reinsurance cede commission"},
    { name: "rilimit_amt", displayName: "RI Limit", description: "Amount of reinsurance coverage"},
    { name: "ripolicy_txt", displayName: "Certificate #", description: "Reinsurance policy number"},
    { name: "ripremium_amt", displayName: "RI Premium", description: "Reinsurance premium"},
    { name: "riretention_amt", displayName: "RI Retention", description: "RI Retention"},
    { name: "rishare_amt", displayName: "RI Share", description: "Reinsurer share (1-100%)"},
    { name: "schedule_txt", displayName: "Schedule", description: "Variable data to be included in form schedule"},
    { name: "security_amt", displayName: "Security", description: "Amount of collateral requested"},
    { name: "share_amt", displayName: "Share", description: "Policy share (1-100% if coinsurance applicable)"},
    { name: "suffix_txt", displayName: "Suffix", description: "Suffix"},
    { name: "surcharge_amt", displayName: "Surcharges", description: "Any applicable to the policy (outside of premiums)"},
    { name: "tax_amt", displayName: "Taxes", description: "Any applicable to the policy (outside of premiums)"},
  ]

  const nonEditFields = [
      { name: "authority_amt", displayName: "Authority Amount", description: "Claims handling settlement authority amount"},
      { name: "basis_id", displayName: "Exposure Basis Type", description: "Classification/type of exposure used"},
      { name: "billtype_id", displayName: "Bill Type", description: "Local Broker Bill, Central Bill, Direct Bill"},
      { name:"broker_address", displayName: "Broker Address", description: "Broker Address" },    
      { name:"broker_id", displayName: "Broker Name", description: "Broker Name" },
      { name:"carrier_address", displayName: "Carrier Address", description: "Carrier Address" },
      { name:"carrier_id", displayName: "Carrier Name", description: "Carrier Name" },
      { name:"commission_amt", displayName: "Broker%", description: "Broker Commission %" },
      { name:"country_id", displayName: "Country Name", description: "Country Name" },
      { name:"description_txt", displayName: "Form Description", description: "Description of form coverage, limitation, exclusion, etc." },
      { name:"effective_dt", displayName: "Effective Date", description: "Effective Date" },
      { name:"expiration_dt", displayName: "Expiration Date", description: "Expiration Date" },
      { name:"exposure_amt", displayName: "Exposure Amount", description: "Exposure Amount" },
      { name:"form_txt", displayName: "Form#", description: "Local company form id number" },
      { name:"insured_address", displayName: "Insured Address", description: "Insured Address" },
      { name:"insured_name", displayName: "Named Insured", description: "Policy first named insured" },
      { name:"limit1_id", displayName: "Limit Type", description: "Description of main limit (e.g. Occurence, AOP, etc.)" },
      { name:"lob_id", displayName: "LoB", description: "Line of Business (see reference table)" },
      { name:"location_address", displayName: "Location Address", description: "Location Address" },
      { name:"location_id", displayName: "Location #", description: "Location #" },
      { name:"name_txt", displayName: "Form Name", description: "Title of form/endorsement" },
      { name:"order_nbr", displayName: "Order", description: "Order of forms/endorsements" },
      { name:"per_amt", displayName: "Rate of Exposure", description: "Rate of exposure basis used (i.e. per 1, per 100, per 1000, etc.)" },
      { name:"policy_id", displayName: "Policy Type", description: "See reference table (i.e. Master, Local, FOS-Master, FOS-Local)" },
      { name:"producer_id", displayName: "Broker Contact", description: "Name of broker working policy" },
      { name:"product_txt", displayName: "Product", description: "Product name (e.g. package if applicable, etc.)" },
      { name:"retention1_id", displayName: "Retention Type", description: "Type of deductible/retention" },
      { name:"riskmanager_id", displayName: "Insured Contact", description: "Insured Contact" },
      { name:"sic_id", displayName: "SIC", description: "SIC" },
      { name:"submission_txt", displayName: "Submission Id", description: "Local system policy id" },
      { name:"tpa_id", displayName: "Claims", description: "Handling protocol (e.g. insurer, tpa, etc.)" },
      { name:"underwriter_id", displayName: "Underwriter Contact", description: "Underwriter Contact" }
  ]

router.post(`/read/policy`, checkAuthenticated, async function(req, res, next) {
    let policy = await  PoliciesSchema.findOne({_id: req.body.policyId })
    if (policy.policy_id == "Local"){
        let terms = await TermsSchema.find({globalPolicyID: policy.globalPolicyID, $or: [
            {country_id: policy.country_id},
            {country_id: "All"}

        ]})
        let exposures = await ExposuresSchema.find({globalPolicyID: policy.globalPolicyID, $or: [
            {country_id: policy.country_id},
            {country_id: "All"}

        ]})
        return res.send({policies: [policy], terms: terms, exposures: exposures})
    } else {
        policy = await PoliciesSchema.find({globalPolicyID: policy.globalPolicyID })
        terms = await TermsSchema.find({globalPolicyID: policy[0].globalPolicyID })
        exposures = await ExposuresSchema.find({globalPolxicyID: policy[0].globalPolicyID })
        return res.send({policies: policy, terms: terms, exposures: exposures})
    }
});


router.post('/read/allpolicies', checkAuthenticated, async function(req, res, next) {
    let token = jwt.verify(req.headers.authorization.split("Bearer ")[1], "secret")
    let user = await User.findOne({email: token.email})
    let resultsPolicies = await PoliciesSchema.find( {country_id: user.country})
    resultsPolicies = resultsPolicies.filter(element => {
        if (element.creationEmail == user.email && element.policy_id === "Local"){
            return false
        } else {
            return true
        }
    })
    res.json(resultsPolicies);
});

// router.get('/read/masterpolicy', checkAuthenticated, async function(req, res, next) {
//     let resultsPolicies = await PoliciesSchema.find({ globalPolicyID: req.body.globalPolicyID })
//     let resultsTerms = await TermSchema.find({ globalPolicyID: req.body.globalPolicyID })
//     let resultsExposures = await ExposureSchema.find({ globalPolicyID: req.body.globalPolicyID })
//     res.json({policies: resultsPolicies, terms: resultsTerms, exposures: resultsExposures});
// });

// router.post('/read/localpolicy', checkAuthenticated, async function(req, res, next) {
//     let resultsPolicy = await PoliciesSchema.findOneById( req.body.policyId )
//     let resultsTerms = await TermSchema.find({ globalPolicyID: req.body.globalPolicyID, $or: 
//         [
//             {country_id: "All"},
//             {country_id: req.body.country_id}
//         ] 
//     })
//     let resultsExposures = await ExposureSchema.find({ globalPolicyID: req.body.globalPolicyID, $or: [
//         {country_id: "All"},
//         {country_id: req.body.country_id}
//     ]
//     })
//     res.json({policy: resultsPolicy, terms: resultsTerms, exposures: resultsExposures});
// });

module.exports = router;
