const nodemailer = require("nodemailer")
const { logger } = require("../../logger")
require('dotenv').config({path:'../../.env'})

const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
    }
})

async function sendMail(options){
    transporter.sendMail(options, function (error, info) {
        if (error){
            logger.log("error", `${error.message}`);
            return
        }
    })
}

module.exports = { sendMail }
