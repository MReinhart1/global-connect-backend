var express = require('express');
var router = express.Router();
const Policy = require("../schemas/policy")
const Terms = require("../schemas/term")
const Exposures = require("../schemas/exposure")
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
  let results = await Policy.find({companyName: req.session.companyName})
  res.render('policy', { companyName: req.session.companyName, policy: results[0].policy });
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
    let newPolicy = new Policy({companyName: req.body.companyName, policy: req.body.Policies})
    let result = await newPolicy.save()
    let newExposures = new Exposures({policyID: result.id, exposures: req.body.Exposures})
    let newTerms = new Terms({policyID: result.id, terms: req.body.Terms})
    await newExposures.save()
    await newTerms.save()
    res.send("done")
    transporter.sendMail(options, function (err, info) {
        if (err){
            console.log(err)
            return
        }
        console.log(info.response)
    })
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
