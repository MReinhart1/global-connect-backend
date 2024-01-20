const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const OrganizationSchema = require("../../schemas/Organization")
require('dotenv').config({path:__dirname+'/../../.env'})



// All unique companies
const ALL_COMPANIES = [
  "Berkshire",
  "Marsh",
  "Aon",
  "Beijing Brokers",
  "Brokers Italia",
  "ABC, Inc.",
  "ABC France",
  "ABC Germany",
  "ABC China",
  "DEF, Inc.",
  "DEF France",
  "DEF Italy",
  "DEF Germany",
  "DEF China",
  "GHI, Inc.",
  "GHI France",
  "GHI Germany",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
]
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { autoIndex: true });

async function createOrg(){
  await OrganizationSchema.collection.drop()
    
  await OrganizationSchema.create({
    company_id: "Berkshire",
    country_id: "",
    location_id: "",
    email: "Berkshire@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "Marsh",
    country_id: "",
    location_id: "",
    email: "Marsh@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "Aon",
    country_id: "",
    location_id: "",
    email: "Aon@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "Beijing Brokers",
    country_id: "China",
    location_id: "",
    email: "BeijingBrokers@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "Brokers Italia",
    country_id: "Italy",
    location_id: "",
    email: "BrokersItalia@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "ABC, Inc.",
    country_id: "",
    location_id: "",
    email: "ABCInc@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "ABC France",
    country_id: "France",
    location_id: "",
    email: "ABCFrance@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "ABC Germany",
    country_id: "Germany",
    location_id: "",
    email: "ABCGermany@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "ABC China",
    country_id: "China",
    location_id: "",
    email: "ABCChina@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "DEF, Inc.",
    country_id: "",
    location_id: "",
    email: "DEFInc@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "DEF France",
    country_id: "France",
    location_id: "",
    email: "DEFFrance@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "DEF Italy",
    country_id: "Italy",
    location_id: "",
    email: "DEFItaly@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "DEF Germany",
    country_id: "Germany",
    location_id: "",
    email: "DEFGermany@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "DEF China",
    country_id: "China",
    location_id: "",
    email: "DEFChina@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "GHI, Inc.",
    country_id: "",
    location_id: "",
    email: "GHIInc@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "GHI France",
    country_id: "France",
    location_id: "",
    email: "GHIFrance@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "GHI Germany",
    country_id: "Germany",
    location_id: "",
    email: "GHIGermany@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "A",
    country_id: "",
    location_id: "",
    email: "A@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "B",
    country_id: "",
    location_id: "",
    email: "B@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "C",
    country_id: "",
    location_id: "",
    email: "C@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "D",
    country_id: "",
    location_id: "",
    email: "D@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "E",
    country_id: "",
    location_id: "",
    email: "E@gmail.com",
    })
    await OrganizationSchema.create({
    company_id: "F",
    country_id: "",
    location_id: "",
    email: "F@gmail.com",
    })

    // for(let index = 0; index< ALL_COMPANIES.length; index++){
    //   let email = ALL_COMPANIES[index]
    //   email = email.replace(/\s/g, '');
    //   email += "@gmail.com"
    //   console.log("await OrganizationSchema.create({")
    //   console.log(` company_id: \"${ALL_COMPANIES[index]}\",`)
    //   console.log(` country_id: \"\",`)
    //   console.log(` location_id: \"\",`)
    //   console.log(` email: \"${email}\",`)
    //   console.log("})")
    // }

    mongoose.connection.close()
    console.log("Done")
}

createOrg()


