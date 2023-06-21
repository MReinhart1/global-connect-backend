var express = require('express');
var router = express.Router();
const PoliciesSchema = require("../../schemas/Policies")
const TermsSchema = require("../../schemas/Terms")
const ExposuresSchema = require("../../schemas/Exposures")
const User = require('../../schemas/User')
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email')

router.get('/read/policy', checkAuthenticated, async function(req, res, next) {
    let resultsPolicies = await PoliciesSchema.find({companyName: req.user.organization})
    if (resultsPolicies.length == 0){
        return res.status(200).send(`No Policies for the company:  ${req.user.organization}`)
    }
    res.json({      
      Policies: resultsPolicies
    });
});

router.get('/read/policy/:id', checkAuthenticated, async function(req, res, next) {
    console.log("Running here")
    let id = req.params.id
    console.log(id)
    try {
        let resultsPolicies = await PoliciesSchema.findOne({_id: id})
        return res.send(resultsPolicies)

    } catch (err){
        return res.status(200).send(`No Policies for the company:  ${req.user.organization}`)
    }
});

router.get('/read/terms', checkAuthenticated, async function(req, res, next) {
    let resultsTerms = await TermsSchema.findOne({policyID: req.body.policyId})
    if (!resultsTerms){
        return res.status(200).send(`No Terms for this policy`)
    }
    res.json({      
      Terms: resultsTerms,
    });
});


router.get('/read/exposures', checkAuthenticated, async function(req, res, next) {
    let resultsExposures = await ExposuresSchema.findOne({policyID: req.body.policyId})
    if (!resultsExposures){
        return res.status(200).send(`No Terms for this policy`)
    }
    res.json({      
        Exposures: resultsExposures,
    });
});


module.exports = router;
