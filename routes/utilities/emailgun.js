const Email = require('email-templates');
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

async function sendAnEmail(){
    const email = new Email({
      message: {
        from: "michaelreinhart112@outlook.com",
      },
      send: true,
      transport: transporter,
      views: {
        options: {
          extension: 'ejs'
        }
      }
    });
    
    let result = email.send({
        template: '/Users/michaelreinhart/Desktop/global-connect-backend/routes/utilities/mars',
        message: {
          to: "michaelreinhart112@gmail.com",
        },
        locals: {
          title: 'World',
          name: 'Michael'
        }
    })
    console.log(result)
    
  
    // sendMail({
    //     from: "michaelreinhart112@outlook.com",
    //     to: "michaelreinhart112@gmail.com",
    //     subject: "Policy",
    //     text: "text shown here",
    //     attachments: [{
    //         filename: 'bear.jpg',
    //         path: './bear.jpg',
    //         cid: 'bearimage' //same cid value as in the html img src
    //     }],
    //     html: HTML
    // })   
}
sendAnEmail()