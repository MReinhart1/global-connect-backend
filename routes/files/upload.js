var express = require('express');
var router = express.Router();
const multer = require("multer")
const { checkAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email');
const { uploadToS3, getFromS3 } = require("../../cloudResources/S3")
const PolicyFilesSchema = require("../../schemas/PolicyFiles")
const { logger } = require("../../logger");

let currentDate

var storage = multer.diskStorage(
    {
        destination: "./uploads",
        filename: function ( req, file, cb ) {
            currentDate = new Date().getTime();
            cb( null, currentDate + ".pdf" );
        }
    }
);

const upload = multer({ dest: "./", storage: storage })

router.post(`/read`,  checkAuthenticated, async function(req, res, next) {
    try {
        let allDocuments = await PolicyFilesSchema.find({policy_id: req.body.policy_id})
        return res.send(allDocuments) 
    } catch (error) {
        logger.log("error", error)
        return res.send("Unexpected Error")
    }
});

router.post(`/upload`,  checkAuthenticated, upload.single('letter'), async function(req, res, next) {
    try {
        let file = {
            date: req.body.date,
            country_id: req.user.country_id,
            company_id: req.user.company_id,
            email: req.user.email,
            policy_id: req.body.policy_id,
            effective_dt: req.body.effective_dt,
            action: req.body.action,
            value: req.body.value,
            globalPolicyID: req.body.globalPolicyID,
            S3FilePath: `${req.user.company_id}/${req.user.country_id}/${currentDate}.pdf`,
        }
        let tags = `Action=${file.action}&Email=${file.email}&country_id=${file.country_id}&company_id=${file.company_id}`
        let newFile = new PolicyFilesSchema(file)
        let validation = newFile.validateSync()
        if (validation == null){
            logger.log("info", 'A document is being uploaded');
            await Promise.all([
                uploadToS3(`${req.user.company_id}/${req.user.country_id}/${currentDate}.pdf`, `${currentDate}.pdf`, tags),
                newFile.save() 
            ])
        } else {
            return res.send(validation.message)
        }
        res.send("done")
    } catch (error) {
        logger.log("error", error)
        return res.send("Unexpected Error")
    }

});

router.post(`/addcomment`,  checkAuthenticated, async function(req, res, next) {
    try {
        await PolicyFilesSchema.findByIdAndUpdate({_id: req.body.policyID}, {comment: req.body.comment})
        return res.send(200)
    } catch (error) {
        logger.log("error", error)
        return res.send("Unexpected Error")
    }

});

router.get(`/download`,  checkAuthenticated, async function(req, res, next) {
    try {
        let file = await getFromS3(req.body.filename)
        let fileName = req.body.filename.split("/")
        fileName = fileName[fileName.length-1]
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        return res.send(file.Body)
    } catch (error) {
        if (error.code == "NoSuchKey"){
            logger.log("error", error)
            return res.send(`File does not exist`)

        } else {
            logger.log("error", error)
            return res.send(`Unexpected Error: ${error.message}`)
        }
    }
});

module.exports = router;
