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

// This is primarily for the work queue
// Client", "Broker", "Auditor", "Underwriter", "Manager", "Administrator"
router.get('/read/allpolicies', checkAuthenticated, async function(req, res, next) {
    const ClientSearchCriteria = {policy_id: "local"}
    const BrokerSearchCriteria = {policy_id: "local"}
    const AuditorSearchCriteria = {policy_id: "local"}

    // All master and local policies for a program where this underwriter is underwriting the master
    // All local policies where this user is the underwriter
    const UnderwriterSearchCriteria = {policy_id: "local"}

    // All policies from the underwriters that the manager manages
    const ManagerSearchCriteria = {policy_id: "local"}

    // All Local policies that are underwritten by the organization
    // All Master policies produced by the organization
    // All local policies produced by a master policy from the organization
    const AdministratorSearchCriteria = {policy_id: "local"}
    if (req.user.occupation == "Client"){
        let policyList = await PoliciesSchema.find({carrier_id: req.user.company_id})

    }
    if (req.user.occupation == "Administrator"){
        let policyList = await PoliciesSchema.find({carrier_id: req.user.company_id})
        // for each companyPolicy if the policy_id is master get all the localo ones as well
    }
    let policyList = await PoliciesSchema.find()
    return res.send(policyList)

});

// Mostly for the program snapshot page
// Return a list of programs with their status and location
router.post('/read/programstatus', checkAuthenticated, async function(req, res, next) {

});

// For the program details page, return every policy based on the globalProgramID
router.post('/read/program', checkAuthenticated, async function(req, res, next) {

});


module.exports = router;
