const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const OrganizationSchema = require("../../schemas/Organization")
require('dotenv').config({path:__dirname+'/../../.env'})

async function createOrg(){
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { autoIndex: true });
    let orgFrance = {
      country_id: "France",
      location_id: "Paris",
      company_id: "Berkshire",
    }
    let orgGermany = {
      country_id: "Germany",
      location_id: "Frankfurt",
      company_id: "Marsh",
    }
    let orgSpain = {
      country_id: "Spain",
      location_id: "Madrid",
      company_id: "Starr",
    }
    let orgSpaintest1 = {
      country_id: "Spain",
      location_id: "Madrid",
      company_id: "Star",
    }

    let orgSpaintest2 = {
      country_id: "Spains",
      location_id: "Madrid",
      company_id: "Starr",
    }

    let orgSpaintest3 = {
      country_id: "Spain",
      location_id: "Madrid",
      company_id: "Starr",
    }
    let newOrgFrance = new OrganizationSchema(orgFrance)
    let newOrgGermany = new OrganizationSchema(orgGermany)
    let newOrgSpain = new OrganizationSchema(orgSpain)

    let orgSpaintest11 = new OrganizationSchema(orgSpaintest1)
    let orgSpaintest22 = new OrganizationSchema(orgSpaintest2)
    let orgSpaintest33 = new OrganizationSchema(orgSpaintest3)
    // await Promise.all([newOrgFrance.save(), newOrgGermany.save(), newOrgSpain.save() ])
    await Promise.all([orgSpaintest11.save(), orgSpaintest22.save(), orgSpaintest33.save() ])
    mongoose.connection.close()
}

createOrg()
