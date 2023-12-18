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

router.post(`/read/policy`, checkAuthenticated, async function(req, res, next) {
    let policy = await  PoliciesSchema.findOne({_id: req.body.policyId })
    if (policy.policy_id == "Local"){
        return res.send({policies: [policy]})
    } else {
        policy = await PoliciesSchema.find({globalPolicyID: policy.globalPolicyID })
        return res.send({policies: policy })
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


module.exports = router;
