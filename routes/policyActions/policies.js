var express = require('express');
var router = express.Router();
const Policies = require("../../schemas/Policies")
const Terms = require("../../schemas/Terms")
const Exposures = require("../../schemas/Exposures")
const User = require('../../schemas/User')
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email')

// Show All policies
router.get('/', checkAuthenticated, async function(req, res, next) {
  let companyName = await User.findById(req.session.passport.user)
  let resultsPolicies = await Policies.find({companyName: companyName.organization})
  let resultsTerms = await Terms.find({policyID: resultsPolicies[0]._id})
  let resultsExposures = await Exposures.find({policyID: resultsPolicies[0]._id})
  if(resultsPolicies.length == 0){
    res.status(200).send(`No Policies for the company:  ${companyName.organization}`)
    return
  }
  res.render('policies', { 
    companyName: resultsPolicies[0].companyName,
    Id: resultsPolicies[0]._id,
    Policies: resultsPolicies[0].Policies,
    Terms: resultsTerms[0].Terms,
    Exposures: resultsExposures[0].Exposures
  });
});

// Create a new policy
router.post('/', async function(req, res, next) {
  try{
      let newPolicy = new Policies({companyName: req.body.Policies[0].carrier_id, Policies: req.body.Policies})
      let result = await newPolicy.save()
      let newExposures = new Exposures({companyName: req.body.companyName, policyID: result.id, Exposures: req.body.Exposures})
      let newTerms = new Terms({companyName: req.body.companyName, policyID: result.id, Terms: req.body.Terms})
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
      res.send("done")
      } catch (e) {
        res.send(e);
      }
  });

router.get('/csv/:id', checkAuthenticated, async function(req, res, next) {
  let results = await getFromS3("s")
  res.send(results)
});

router.get('/term/:id', checkAuthenticated, async function(req, res, next) {
  let results = await Terms.find({ policyID: req.params.id })
  res.send(results);
});

router.get('/exposures/:id', checkAuthenticated, async function(req, res, next) {
  let results = await Exposures.find({ policyID: req.params.id })
  res.send(results);
});

// Accept Policy
router.post('/accept', checkAuthenticated, async function(req, res, next) {
  await Policies.findOneAndUpdate({_id: req.body.masterPolicyId, "Policies._id": req.body.policyId}, { $set:{'Policies.$.status': "Accepted"}})
  if (process.env.MAILENABLED == 'true'){
    sendMail({
      from: process.env.EMAIL,
      to: "michaelreinhart112@gmail.com",
      subject: "Policy",
      text: `A Policy has been accepted for you in ${req.body.country_id}, check it out here: http://localhost:3000/policies/${req.body.policyId}`
    })
  }
  res.send("The policy has been accepted");
});

// Reject Policy
router.post('/reject', checkAuthenticated, async function(req, res, next) {
  await Policies.findOneAndUpdate({_id: req.body.masterPolicyId, "Policies._id": req.body.policyId}, { $set:{'Policies.$.status': "Rejected"}})
  if (process.env.MAILENABLED == 'true'){
    sendMail({
      from: process.env.EMAIL,
      to: "michaelreinhart112@gmail.com",
      subject: "Policy",
      text: `A Policy has been rejected for you in ${req.body.country_id}, check it out here: http://localhost:3000/policies/${req.body.policyId}`
    })
  }
  res.send("The policy has been rejected");
});

// Show Policy
router.post('/modify', checkAuthenticated, async function(req, res, next) {
  let result = await Policies.find({ "Policies": {$elemMatch: { _id: req.body.policyId}}}, {"Policies.$": 1})
  res.render("modifypolicy", {masterPolicyId: req.body.masterPolicyId, PolicyId: req.body.policyId, policy: result[0].Policies[0]});
});

// router.post('/modify', checkAuthenticated, async function(req, res, next) {
//   console.log("Got response  ", req.body)
//   res.send("The policy has been modified");
// });

module.exports = router;
