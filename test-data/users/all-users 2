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
    country: "Spain",
    company: "Berkshire",
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
    country: "USA",
    company: "A",
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
    country: "USA",
    company: "A",
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
    country: "USA",
    company: "Marsh",
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
    country: "USA",
    company: "ABC, Inc.",
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
    country: "France",
    company: "B",
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
    country: "France",
    company: "Marsh",
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
    country: "France",
    company: "ABC France",
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
    country: "Germany",
    company: "A",
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
    country: "Germany",
    company: "Marsh",
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
    country: "Germany",
    company: "ABC Germany",
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
    country: "China",
    company: "C",
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
    country: "China",
    company: "Beijing Brokers",
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
    country: "China",
    company: "ABC China",
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
    country: "USA",
    company: "D",
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
    country: "USA",
    company: "Aon",
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
    country: "USA",
    company: "DEF, Inc.",
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
    country: "France",
    company: "Aon",
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
    country: "France",
    company: "DEF France",
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
    country: "Italy",
    company: "E",
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
    country: "Italy",
    company: "Brokers Italia",
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
    country: "Italy",
    company: "DEF Italy",
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
    country: "Germany",
    company: "F",
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
    country: "Germany",
    company: "Aon",
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
    country: "Germany",
    company: "DEF Germany",
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
    country: "China",
    company: "Aon",
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
    country: "China",
    company: "DEF China",
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
    country: "USA",
    company: "GHI, Inc.",
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
    country: "France",
    company: "GHI France",
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
    country: "Germany",
    company: "GHI Germany",
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
    country: "USA",
    company: "A",
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
    country: "USA",
    company: "A",
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
    country: "USA",
    company: "D",
    occupation: "Manager",
    manager: "",
    })
    console.log("Done")
    mongoose.disconnect()
}

createUsers()