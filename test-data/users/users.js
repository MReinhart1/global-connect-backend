const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const UserSchema = require("../../schemas/user")
require('dotenv').config({path:__dirname+'/../../.env'})
const bcrypt = require("bcrypt")

const INFORMATION = [
    {
    company: "Berkshire",
    country: "France"
}, 
    {
    company: "Marsh",
    country: "Germany"
}, 
    {
    company: "Starr",
    country: "Spain"
}
]

async function createUser(numUsers){
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { autoIndex: true });
    for(let i = 0; i < numUsers; i++){
        const hashedPassword = await bcrypt.hash("Passw0rd1!", 10)
        let index = Math.floor(Math.random()*INFORMATION.length)
        let user = {
            email:  faker.person.firstName() + faker.person.lastName() + "@" + INFORMATION[index].company + ".com",
            password: hashedPassword,
            country: INFORMATION[index].country,
            company: INFORMATION[index].company,
            occupation: "Underwriter",
        }
        let newUser = new UserSchema(user)
        try {
            await newUser.save()
            logger.log("info", newUser + `\n\n\n Count: ${i}`);
        } catch (error) {}
    }
    mongoose.connection.close()
}


async function createAdmin(){
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { autoIndex: true });
        const hashedPassword = await bcrypt.hash("Passw0rd1!", 10)
        let IvarBerkshire = {
            email:  "IvarBoneless@berkshire.com",
            password: hashedPassword,
            country: "France",
            company: "Berkshire",
            occupation: "Administrator",
        }
        let newUser = new UserSchema(IvarBerkshire)
        try {
            await newUser.save()
            logger.log("info", newUser + `\n\n\n Count: ${i}`);
        } catch (error) {}
    mongoose.connection.close()
}

createAdmin()
// createUser(100)


// // Data to create
// Countries: { France, Germany, Spain }
// Companies: { Berkshire-France, Marsh-Germany, Starr-Spain }
// 4 users: 2 from Berkshire, 1 Marsh, 1 Starr

// 6 programs:
// 3-Berkshire
// 2-Marsh
// 1-Starr
