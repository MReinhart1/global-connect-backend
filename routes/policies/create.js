var express = require('express');
var router = express.Router();
const PoliciesSchema = require("../../schemas/Policies")
const TermsSchema = require("../../schemas/Terms")
const ExposuresSchema = require("../../schemas/Exposures")
const User = require('../../schemas/User')
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email')

// Create a new policy

router.post('/validate', async function(req, res, next) {
    console.log(req.body)
    let newPolicy = new PoliciesSchema({companyName: req.body.Policies[0].carrier_id, Policies: req.body.Policies})
    let newExposures = new ExposuresSchema({companyName: req.body.companyName, policyID: "example-id", Exposures: req.body.Exposures})
    let newTerms = new TermsSchema({companyName: req.body.companyName, policyID: "example-id", Terms: req.body.Terms})
    let errors = []
    try {
        await newPolicy.validate()
    } catch (err){
        errors.push(err)
    }
    try {
        await newExposures.validate()
    } catch (err){
        errors.push(err)
    }
    try {
        await newTerms.validate()
    } catch (err){
        errors.push(err)
    }
    res.send({errors})
})

router.post('/create', async function(req, res, next) {
    try{
        let newPolicy = new PoliciesSchema({companyName: req.body.Policies[0].carrier_id, Policies: req.body.Policies})
        let result = await newPolicy.save()
        let newExposures = new ExposuresSchema({companyName: req.body.companyName, policyID: result.id, Exposures: req.body.Exposures})
        let newTerms = new TermsSchema({companyName: req.body.companyName, policyID: result.id, Terms: req.body.Terms})
        await newExposures.save()
        await newTerms.save()
        if (process.env.MAILENABLED == 'true'){
          sendMail({
            from: process.env.EMAIL,
            to: "michaelreinhart112@gmail.com",
            subject: "Policy Upload finished",
            text: "A Policy has been created"
          })
        }
        return res.status(200).send()
        } catch (e) {
            console.log(e)
          res.send(e);
        }
});

module.exports = router;
