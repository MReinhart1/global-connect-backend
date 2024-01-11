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
const { logger } = require("../../logger")


async function sendEmail(element){
    let emailUser = await User.findOne({"country": element.country_id})
    if (process.env.MAILENABLED == 'true'){
        sendMail({
            from: process.env.EMAIL,
            to: "michaelreinhart112@gmail.com",
            subject: "Policy Upload finished",
            text: `Email for country: ${element.country_id}\n To User: ${emailUser}`
        })
    }
}

router.post('/create', checkAuthenticated, async function(req, res, next) {
    try{
        let token = jwt.verify(req.headers.authorization.split("Bearer ")[1], "secret")
        let uuid = Math.floor(Math.random() * 1000000000) + "" + Date.now()
        let PolicyList = []
        for(let policyIndex = 0; policyIndex < req.body.Policies.length; policyIndex++){
            let newPolicy = new PolicySchema()
            let allKeys = Object.keys(req.body.Policies[policyIndex])
            allKeys.forEach(function(value) {
                newPolicy[value] = {...newPolicy[value], Value: req.body.Policies[policyIndex][value] }
            });
            newPolicy['globalPolicyID'] = uuid
            newPolicy['creationEmail'] = token.email

            // Terms
            for(let termsIndex = 0; termsIndex < req.body.Terms.length; termsIndex++){
                if(req.body.Terms[termsIndex].country_id == "All" || req.body.Policies[policyIndex].country_id == req.body.Terms[termsIndex].country_id){
                    let allTermKeys = Object.keys(req.body.Terms[termsIndex])
                    let termElement = new TermSchema()
                    allTermKeys.forEach(function(value) {
                        termElement[value] = {...termElement[value], Value: req.body.Terms[termsIndex][value] }
                    });
                    newPolicy.Terms.push(termElement)
                }
            }

            // Exposures
            for(let exposuresIndex = 0; exposuresIndex < req.body.Exposures.length; exposuresIndex++){
                if(req.body.Exposures[exposuresIndex].country_id == "All" || req.body.Policies[policyIndex].country_id == req.body.Exposures[exposuresIndex].country_id){
                    let allExposureKeys = Object.keys(req.body.Exposures[exposuresIndex])
                    let exposureElement = new ExposureSchema()
                    allExposureKeys.forEach(function(value) {
                        exposureElement[value] = {...exposureElement[value], Value: req.body.Exposures[exposuresIndex][value] }
                    });
                    newPolicy.Exposures.push(exposureElement)
                }
            }
            PolicyList.push(newPolicy)
            sendEmail(req.body.Policies[policyIndex])
        }
        let errorList = await ValidatePolicyList(PolicyList)
        if (errorList.length == 0){
            PolicySchema.create(PolicyList)
        } else {
            return res.status(200).send(errorList)
        }
        return res.status(200).send("Policy Uploaded")
    } catch (e) {
        logger.log("error", `${e.message}`);
        res.send(e);
    }
});


async function ValidatePolicyList(PolicyList){
    let errorList = []
    for(let element = 0; element < PolicyList.length; element++){
        try {
            await PolicyList[element].validate()
        } catch (error){
            console.log(`=======================================  ${PolicyList[element].country_id.Value} -  ${PolicyList[element].policy_id.Value} ===================================================`)
            console.log(Object.keys(error.errors))
            for (let index = 0; index < Object.keys(error.errors).length; index++){
                // console.log(error.errors[Object.keys(error.errors)[index]])
                console.log(error.errors[Object.keys(error.errors)[index]].properties.message)
                console.log(error.errors[Object.keys(error.errors)[index]].properties.path.split(".Value")[0])
                if ( error.errors[Object.keys(error.errors)[index]].properties.value == "" ){
                    console.log("No Value")
                } else {
                    console.log(error.errors[Object.keys(error.errors)[index]].properties.value)
                }
            }
            console.log("==========================================================================================")
            errorList.push(error.message)
        }
    }
    return errorList
}

module.exports = router;
