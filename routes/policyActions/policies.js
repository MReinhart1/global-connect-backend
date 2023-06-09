var express = require('express');
var router = express.Router();
const Policies = require("../../schemas/Policies")
const Terms = require("../../schemas/Terms")
const Exposures = require("../../schemas/Exposures")
const User = require('../../schemas/User')
const nodemailer = require("nodemailer")
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/authentication");


const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
    }
})

const options = {
    from: process.env.EMAIL,
    to: "michaelreinhart112@gmail.com",
    subject: "Policy Upload finished",
    text: "Great Job"
}


router.get('/', checkAuthenticated, async function(req, res, next) {
  let companyName = await User.findById(req.session.passport.user)
  let resultsPolicies = await Policies.find({companyName: companyName.organization})
  let resultsTerms = await Terms.find({companyName: companyName.organization})
  let resultsExposures = await Exposures.find({companyName: companyName.organization})
  if(resultsPolicies.length == 0){
    res.status(200).send(`No Policies for the company:  ${companyName.organization}`)
    return
  }
  res.render('policies', { 
    companyName: req.session.companyName,
    Id: resultsPolicies[0]._id,
    Policies: resultsPolicies[0].Policies,
    Terms: resultsTerms[0].Terms,
    Exposures: resultsExposures[0].Exposures
  });
});

router.post('/', checkAuthenticated, async function(req, res, next) {
  try{
      let newPolicy = new Policies({companyName: req.body.companyName, Policies: req.body.Policies})
      let result = await newPolicy.save()
      let newExposures = new Exposures({companyName: req.body.companyName, policyID: result.id, Exposures: req.body.Exposures})
      let newTerms = new Terms({companyName: req.body.companyName, policyID: result.id, Terms: req.body.Terms})
      await newExposures.save()
      await newTerms.save()
      if (process.env.MAILENABLED == 'true'){
        transporter.sendMail(options, function (err, info) {
          if (err){
              console.log(err)
              return
          }
          console.log(info.response)
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

module.exports = router;
