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
const { uploadToS3 } = require("../../cloudResources/S3")


var storage = multer.diskStorage(
    {
        destination: __dirname + '/../../../uploads/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname );
        }
    }
);
const upload = multer({ dest: __dirname + '/../../../uploads/', storage: storage })



router.post(`/upload`,  upload.single('letter'), async function(req, res, next) {
    console.log("Hello there")
    uploadToS3("hello-michael-4x", __dirname + "/../../../uploads/Letter-recommendation.pdf")
    res.send("Hrellp")
});

module.exports = router;
