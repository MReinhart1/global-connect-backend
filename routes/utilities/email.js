const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
    }
})

async function sendMail(options){
    transporter.sendMail(options, function (err, info) {
        if (err){
            console.log(err)
            return
        }
    })
}

module.exports = { sendMail }
