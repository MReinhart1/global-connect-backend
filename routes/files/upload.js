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
            if (file.mimetype == 'image/png'){
                cb( null, currentDate + ".png" );
            } else if(file.mimetype == 'application/pdf'){
                cb( null, currentDate + ".pdf" );
            } else {
                cb( null, currentDate + ".txt" );
            }
        }
    }
);

const upload = multer({ dest: "./", storage: storage })

router.post(`/getprogramfiles`,  checkAuthenticated, async function(req, res, next) {
    try {
        let result = await PolicyFilesSchema.find({globalPolicyID: req.body.globalPolicyID})
        if(result === null) {
            logger.log("warn", `Files do not exist`);
            return res.status(200).send("No files found")
        }
        return res.send(result)
    } catch (error) {
        logger.log("error", error)
        return res.send("Unexpected Error")
    }
});

router.post(`/getpolicyfiles`,  checkAuthenticated, async function(req, res, next) {
    try {
        let result = await PolicyFilesSchema.find({policy_id: req.body.policy_id, })
        if(result === null) {
            logger.log("warn", `Files do not exist`);
            return res.status(200).send("No files found")
        }
        return res.send(result)
    } catch (error) {
        logger.log("error", error)
        return res.send("Unexpected Error")
    }
});

router.post(`/upload`,  checkAuthenticated, upload.single('letter'), async function(req, res, next) {
    try {
        let country_id = req.user.country_id.replace(/\s/g, '');
        let mimetype = req.file.mimetype.split("/")[1]
        let file = {
            date: req.body.date,
            country_id: req.user.country_id,
            company_id: req.user.company_id,
            email: req.user.email,
            globalPolicyID: req.body.globalPolicyID,
            policy_id: req.body.policy_id,
            effective_dt: req.body.effective_dt,
            action: req.body.action,
            value: req.body.value,
            S3FilePath: `${req.user.company_id}/${country_id}/${currentDate}.${mimetype}`,
        }
        let tags = `Action=${file.action}&Email=${file.email}&country_id=${file.country_id}&company_id=${file.company_id}`
        let newFile = new PolicyFilesSchema(file)
        let validation = newFile.validateSync()
        if (validation == null){
            logger.log("info", 'A document is being uploaded');
            await Promise.all([
                uploadToS3(`${req.user.company_id}/${country_id}/${currentDate}.${mimetype}`, `${currentDate}.${mimetype}`, tags),
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
        const comment = {
            email: req.user.email,
            message: req.body.message,
        }
        let result = await PolicyFilesSchema.findByIdAndUpdate({_id: req.body._id}, { $push: { comments: comment } })
        if(result === null) {
            logger.log("warn", `Files do not exist`);
            return res.status(200).send("No files found")
        }
        return res.status(200)
    } catch (error) {
        logger.log("error", error)
        return res.send("Unexpected Error")
    }

});

router.post(`/download`,  checkAuthenticated, async function(req, res, next) {
    try {
        let file = await getFromS3(req.body.filename)
        let mimetype = req.body.filename.split(".")[1]
        let fileName = req.body.filename.split("/")
        fileName = fileName[fileName.length-1]
        if (mimetype == 'png'){
            res.setHeader('Content-Type', 'image/png');
        } else if(mimetype == 'pdf'){
            res.setHeader('Content-Type', 'application/pdf');
        } else {
            res.setHeader('Content-Type', 'application/pdf');
        }
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
