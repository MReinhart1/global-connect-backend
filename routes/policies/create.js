var express = require('express');
var router = express.Router();
const PolicySchema = require("../../schemas/Policies")
const TermSchema = require("../../schemas/Terms")
const ExposureSchema = require("../../schemas/Exposures")
const User = require('../../schemas/user')
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email')
const jwt = require('jsonwebtoken')

router.post('/create', async function(req, res, next) {
    try{
        console.log("Request.User")
        console.log(req.headers.authorization)
        let token = jwt.verify(req.headers.authorization.split("Bearer ")[1], "secret")
        console.log(token)
        let uuid = Math.floor(Math.random() * 1000000000) + "" + Date.now()
        for(let i = 0; i < req.body.Policies.length; i++){
            let newPolicy = new PolicySchema({globalPolicyID: uuid, creationEmail: token.email ,...req.body.Policies[i]})
            newPolicy.save()
        }
        for(let i = 0; i < req.body.Terms.length; i++){
            let newTerm = new TermSchema({globalPolicyID: uuid, ...req.body.Terms[i]})
            newTerm.save()
        }
        for(let i = 0; i < req.body.Exposures.length; i++){
            let newExposure = new ExposureSchema({globalPolicyID: uuid, ...req.body.Exposures[i]})
            newExposure.save()
        }
        req.body.Policies.forEach(async element => {
            let emailUser = await User.findOne({"country": element.country_id})
            if (process.env.MAILENABLED == 'true'){
                sendMail({
                    from: process.env.EMAIL,
                    to: "michaelreinhart112@gmail.com",
                    subject: "Policy Upload finished",
                    text: `Email for country: ${element.country_id}\n To User: ${emailUser}`
                })
            }
            
        });

        return res.status(200).send()
        } catch (e) {
            console.log(e)
          res.send(e);
        }
});


router.post('/validate', async function(req, res, next) {
    if(req.body?.Policies  === undefined){
        return res.send("This JSON has no policies")
    }
    let errors = []
    let uuid = Math.floor(Math.random() * 1000000000) + "" + Date.now()
    for(let i = 0; i < req.body.Policies.length; i++){
        let newPolicy = new PolicySchema({globalPolicyID: uuid, ...req.body.Policies[i]})
        try {
            await newPolicy.validate()
        } catch (err){
            errors.push(err.errors)
        }
    }
    for(let i = 0; i < req.body.Terms.length; i++){
        let newTerm = new TermSchema({globalPolicyID: uuid, ...req.body.Terms[i]})
        try {
            await newTerm.validate()
        } catch (err){
            errors.push(err.errors)
        }
    }
    for(let i = 0; i < req.body.Exposures.length; i++){
        let newExposure = new ExposureSchema({globalPolicyID: uuid, ...req.body.Exposures[i]})
        try {
            await newExposure.validate()
        } catch (err){
            errors.push(err.errors)
        }
    }
    res.send({errors})
})

module.exports = router;
