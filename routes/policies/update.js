var express = require('express');
var router = express.Router();
const PoliciesSchema = require("../../schemas/Policies")
const TermsSchema = require("../../schemas/Terms")
const ExposuresSchema = require("../../schemas/Exposures")
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email')

router.post('/update', checkAuthenticated, async function(req, res, next) {
  console.log(req.body)
    let policy = await PoliciesSchema.findById({_id: req.body.policyId})
    if(!policy){
        return res.status(200).send("No policy found")
    }
    let PolicyToUpdate = policy
    if(PolicyToUpdate.status === "Accepted") return res.status(200).send("Policy has already been accepted")
    if(PolicyToUpdate.status === "Rejected") return res.status(200).send("Policy has already been rejected")
    let result = await PoliciesSchema.findOneAndUpdate({_id: req.body.policyId }, {modifications: {email: req.body.email, updates: {...policy.modifications?.updates, ...req.body.updates}}})
    console.log(result)
    if (process.env.MAILENABLED == 'true'){
      sendMail({
          from: process.env.EMAIL,
          to: "michaelreinhart112@gmail.com",
          subject: "Policy",
          text: `${result.country_id}\n\nA Policy has been accepted for you, check it out here: http://localhost:3000/policies`,
        })
    }
    res.status(200).send()
});

router.post('/bind', checkAuthenticated, async function(req, res, next) {
  console.log("Binding here")
    let result = ""
    try {
        result = await PoliciesSchema.findOneAndUpdate({_id: req.body.policyId }, { status: "Binder" })
    } catch(err) {console.log(err)}
    if(!result){
        return res.status(200).send("No policy found")
    }
    if (process.env.MAILENABLED == 'true'){
    sendMail({
        from: process.env.EMAIL,
        to: "michaelreinhart112@gmail.com",
        subject: "Policy",
        text: `${result.country_id}\n\nA Policy has been accepted for you, check it out here: http://localhost:3000/policies`,
      })
    }
    res.status(200).send();
});

router.post('/reject', checkAuthenticated, async function(req, res, next) {
    let result = ""
    try {
    result = await PoliciesSchema.findOneAndUpdate({_id: req.body.policyId }, { status: "Rejected" })
    } catch(err) {console.log(err)}
    if(!result){
        return res.status(200).send("No policy found")
    }
    if (process.env.MAILENABLED == 'true'){
      sendMail({
        from: process.env.EMAIL,
        to: "michaelreinhart112@gmail.com",
        subject: "Policy",
        text: `A Policy has been rejected for you in ${result.country_id}, check it out here: http://localhost:3000/policies`
      })
    }
    res.status(200).send();
  });

module.exports = router;
