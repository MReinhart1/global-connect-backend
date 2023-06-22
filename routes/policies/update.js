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
    let masterPolicy = await PoliciesSchema.findById(req.body.masterPolicyId)
    let historyObject = []
    if(!masterPolicy){
        return res.status(200).send("No policy found")
    }
    let PolicyToUpdate = masterPolicy.Policies.filter(element => element.id === req.body.policyId)
    PolicyToUpdate = PolicyToUpdate[0]
    if(PolicyToUpdate.status === "Accepted") return res.status(200).send("Policy has already been accepted")
    if(PolicyToUpdate.status === "Rejected") return res.status(200).send("Policy has already been rejected")
    for (let i = 0; i < req.body.updates.length; i++){
      historyObject.push({key: req.body.updates[i].key, previous: PolicyToUpdate[`${req.body.updates[i].key}`], next: req.body.updates[i].value})
      PolicyToUpdate[`${req.body.updates[i].key}`] = req.body.updates[i].value
    }
    PolicyToUpdate.status = "Uploaded"
    let result = await PoliciesSchema.findOneAndUpdate({_id: req.body.masterPolicyId, "Policies._id": req.body.policyId }, {$set: { "Policies.$": PolicyToUpdate }})
    let updatedPolicy = result.Policies.filter(element => element.id === req.body.policyId)
    updatedPolicy = updatedPolicy[0]
    if (process.env.MAILENABLED == 'true'){
      sendMail({
          from: process.env.EMAIL,
          to: "michaelreinhart112@gmail.com",
          subject: "Policy",
          text: `${updatedPolicy.country_id}\n\nA Policy has been accepted for you, check it out here: http://localhost:3000/policies`,
        })
    }
    res.status(200).send()
});

router.post('/accept', checkAuthenticated, async function(req, res, next) {
    let result = ""
    try {
        result = await PoliciesSchema.findOneAndUpdate({_id: req.body.masterPolicyId, "Policies._id": req.body.policyId}, { $set: { 'Policies.$.status': "Accepted" }})
    } catch(err) {console.log(err)}
    if(!result){
        return res.status(200).send("No policy found")
    }
    let acceptedPolicy = result.Policies.filter(element => element.id === req.body.policyId)
    acceptedPolicy = acceptedPolicy[0]
    if (process.env.MAILENABLED == 'true'){
    sendMail({
        from: process.env.EMAIL,
        to: "michaelreinhart112@gmail.com",
        subject: "Policy",
        text: `${acceptedPolicy.country_id}\n\nA Policy has been accepted for you, check it out here: http://localhost:3000/policies`,
      })
    }
    res.status(200).send();
});

router.post('/reject', checkAuthenticated, async function(req, res, next) {
    let result = ""
    try {
    result = await PoliciesSchema.findOneAndUpdate({_id: req.body.masterPolicyId, "Policies._id": req.body.policyId}, { $set:{'Policies.$.status': "Rejected"}})
    } catch(err) {console.log(err)}
    if(!result){
        return res.status(200).send("No policy found")
    }
    let rejectedPolicy = result.Policies.filter(element => element.id === req.body.policyId)
    rejectedPolicy = rejectedPolicy[0]
    if (process.env.MAILENABLED == 'true'){
      sendMail({
        from: process.env.EMAIL,
        to: "michaelreinhart112@gmail.com",
        subject: "Policy",
        text: `A Policy has been rejected for you in ${rejectedPolicy.country_id}, check it out here: http://localhost:3000/policies/${req.body.policyId}`
      })
    }
    res.status(200).send();
  });

module.exports = router;
