const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const UserSchema = require("../../schemas/user")
require('dotenv').config({path:__dirname+'/../../.env'})
const bcrypt = require("bcrypt")

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    autoIndex: true
});

async function createUsers(){
    await UserSchema.collection.drop()
    
    const hashedPassword = await bcrypt.hash("Passw0rd1!", 10)
    await UserSchema.create({
    email: "ande.vladimir@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Vlad",
    lastName: "Deryuzhenko",
    mobile: "01-646-708-5817",
    country_id: "Spain",
    company_id: "Berkshire",
    occupation: "Administrator",
    manager: "Jeanie Smith",
    })
    await UserSchema.create({
    email: "michaelreinhart112@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Michael",
    lastName: "Reinhart",
    mobile: "01-860-989-6723",
    country_id: "United States",
    company_id: "A",
    occupation: "Administrator",
    manager: "Jeanie Smith",
    })
    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Adam",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "A",
    occupation: "Underwriter",
    manager: "Jeanie Smith",
    })
    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Brian",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "Marsh",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Charlie",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "ABC, Inc.",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "David",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "France",
    company_id: "B",
    occupation: "Underwriter",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "George",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "France",
    company_id: "Marsh",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Jon",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "France",
    company_id: "ABC France",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Edward",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Germany",
    company_id: "A",
    occupation: "Underwriter",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Henry",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Germany",
    company_id: "Marsh",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "King",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Germany",
    company_id: "ABC Germany",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Frank",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "China",
    company_id: "C",
    occupation: "Underwriter",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Ms.",
    firstName: "Ida",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "China",
    company_id: "Beijing Brokers",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Lincoln",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "China",
    company_id: "ABC China",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Ms.",
    firstName: "Mary",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "D",
    occupation: "Underwriter",
    manager: "Brandy Smith",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Ms.",
    firstName: "Nora",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "Aon",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Oscar",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "DEF, Inc.",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Ms.",
    firstName: "Queenie",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "France",
    company_id: "Aon",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Robert",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "France",
    company_id: "DEF France",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Sam",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Italy",
    company_id: "E",
    occupation: "Underwriter",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Tom",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Italy",
    company_id: "Brokers Italia",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Ule",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Italy",
    company_id: "DEF Italy",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Victor",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Germany",
    company_id: "F",
    occupation: "Underwriter",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "William",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Germany",
    company_id: "Aon",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Yountis",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Germany",
    company_id: "DEF Germany",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Paul",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "China",
    company_id: "Aon",
    occupation: "Broker",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Zachary",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "China",
    company_id: "DEF China",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Ms.",
    firstName: "Stephanie",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "GHI, Inc.",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Ms.",
    firstName: "Ariel",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "France",
    company_id: "GHI France",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Mathew",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "Germany",
    company_id: "GHI Germany",
    occupation: "Client",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Jack",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "A",
    occupation: "Underwriter",
    manager: "Jeanie Smith",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Ms.",
    firstName: "Jeanie",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "A",
    occupation: "Manager",
    manager: "",
    })

    await UserSchema.create({
    email: "michaelreinhart112-test@gmail.com",
    password: hashedPassword,
    salutation: "Mr.",
    firstName: "Brandy",
    lastName: "Smith",
    mobile: "01-646-708-5817",
    country_id: "United States",
    company_id: "D",
    occupation: "Manager",
    manager: "",
    })
    console.log("Done")
    mongoose.disconnect()
}

createUsers()