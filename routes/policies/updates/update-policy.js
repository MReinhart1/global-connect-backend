var express = require('express');
var router = express.Router();
const PoliciesSchema = require("../../../schemas/Policies")
const TermsSchema = require("../../../schemas/Terms")
const ExposuresSchema = require("../../../schemas/Exposures")
const { getFromS3 } = require('../../../cloudResources/S3')
const { checkAuthenticated } = require("../../middleware/authentication");
const { sendMail } = require('../../utilities/email')
const { logger } = require("../../../logger")

router.post('/update', checkAuthenticated, async function(req, res, next) {
  try{
    logger.log("info", `Updating a policy`);
    let policy = await PoliciesSchema.findById({_id: req.body.policyId})
    if(!policy){
        return res.status(200).send("No policy found")
    }
    let PolicyToUpdate = policy
    if(PolicyToUpdate.status === "Accepted") return res.status(200).send("Policy has already been accepted")
    if(PolicyToUpdate.status === "Rejected") return res.status(200).send("Policy has already been rejected")
    let updateKeys = Object.keys(req.body.updates)
    updateKeys.forEach(element => {
      policy[element].Value = req.body.updates[element]
    });
    let result = await PoliciesSchema.findOneAndUpdate({_id: req.body.policyId }, policy)
    if (process.env.MAILENABLED == 'true'){
      sendMail({
          from: process.env.EMAIL,
          to: "michaelreinhart112@gmail.com",
          subject: "Policy",
          text: `${result.country_id}\n\nA Policy has been accepted for you, check it out here: http://localhost:3000/policies`,
        })
    }
    res.status(200).send()
  } catch (err){
    if (err.code === 11000){
      return res.status(200).send("This policy already exists")
    }
    return res.send(err.message)
  }
});

module.exports = router;
