var express = require('express');
var router = express.Router();
const PoliciesSchema = require("../../../schemas/Policies")
const TermsSchema = require("../../../schemas/Terms")
const ExposuresSchema = require("../../../schemas/Exposures")
const { getFromS3 } = require('../../../cloudResources/S3')
const { checkAuthenticated } = require("../../middleware/authentication");
const { sendMail } = require('../../utilities/email')

router.post('/bind', checkAuthenticated, async function(req, res, next) {
  logger.log("info", `Binding the policy`);
  let result = ""
  try {
      result = await PoliciesSchema.findOneAndUpdate({_id: req.body.policyId }, { status: "Binder" })
  } catch(error) {
    logger.log("error", `${error.message}`);
  }
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
    } catch(error) {logger.log("error", `${error.message}`);}
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

router.post('/delete', checkAuthenticated, async function(req, res, next) {
    try {
      result = await PoliciesSchema.findOneAndUpdate({_id: req.body.policyId }, { deleted: true })
    } catch(error) {logger.log("error", `${error.message}`);}
    if(!result){
        return res.status(200).send("No policy found")
    }
    res.status(200).send();
});

module.exports = router;
