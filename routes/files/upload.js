var express = require('express');
var router = express.Router();
const PoliciesSchema = require("../../schemas/Policies")
const TermsSchema = require("../../schemas/Terms")
const ExposuresSchema = require("../../schemas/Exposures")
const User = require('../../schemas/user')
const { getFromS3 } = require('../../cloudResources/S3')
const { checkAuthenticated } = require("../middleware/authentication");
const { sendMail } = require('../utilities/email');
const { STATES } = require('mongoose');
const jwt = require('jsonwebtoken')
const multer = require("multer")


const uploads = multer({dest: __dirname + "/uploads"})
// checkAuthenticated
router.post(`/upload`,  uploads.single('file'), async function(req, res, next) {
    console.log(req.body)
    res.send(req.file)
});

module.exports = router;
