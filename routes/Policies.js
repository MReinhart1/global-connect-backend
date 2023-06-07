var express = require('express');
var router = express.Router();
const Policies = require("../schemas/Policies")
const Terms = require("../schemas/Terms")
const Exposures = require("../schemas/Exposures")
const nodemailer = require("nodemailer")

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


router.get('/', async function(req, res, next) {
  if (!req.session.companyName){
    req.session.companyName= "Progressive"
  }
  let resultsPolicies = await Policies.find({companyName: req.session.companyName})
  let resultsTerms = await Terms.find({companyName: req.session.companyName})
  let resultsExposures = await Exposures.find({companyName: req.session.companyName})
  res.render('Policies', { 
    companyName: req.session.companyName,
    Policies: resultsPolicies[0].Policies,
    Terms: resultsTerms[0].Terms,
    Exposures: resultsExposures[0].Exposures
  });
});


router.get('/term/:id', async function(req, res, next) {
  let results = await Terms.find(req.query.id)
  res.send(results);
});

router.get('/exposures/:id', async function(req, res, next) {
  let results = await Exposures.find(req.query.id)
  res.send(results);
});

router.post('/', async function(req, res, next) {
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

module.exports = router;
