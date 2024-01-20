const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const UserSchema = require("../../schemas/user")
require('dotenv').config({path:__dirname+'/../../.env'})
const bcrypt = require("bcrypt")

const INFORMATION = [
    {
    company_id: "Berkshire",
    country_id: "France"
}, 
    {
    company_id: "Marsh",
    country_id: "Germany"
}, 
    {
    company_id: "Starr",
    country_id: "Spain"
}
]

async function createUser(numUsers){
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { autoIndex: true });
    for(let i = 0; i < numUsers; i++){
        const hashedPassword = await bcrypt.hash("Passw0rd1!", 10)
        let index = Math.floor(Math.random()*INFORMATION.length)
        let user = {
            email:  faker.person.firstName() + faker.person.lastName() + "@" + INFORMATION[index].company_id + ".com",
            password: hashedPassword,
            country_id: INFORMATION[index].country_id,
            company_id: INFORMATION[index].company_id,
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
        try {
            await UserSchema.create({
                email:  "michaelreinhart112@gmail.com",
                password: hashedPassword,
                country_id: "France",
                company_id: "Berkshire",
                occupation: "Administrator",
            })
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
