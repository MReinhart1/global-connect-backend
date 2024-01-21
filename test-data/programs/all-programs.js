const mongoose = require('mongoose');

const PolicySchema = require("../../schemas/Policies")
const TermSchema = require("../../schemas/Terms")
const ExposureSchema = require("../../schemas/Exposures")

require('dotenv').config({path:__dirname+'/../../.env'})

const PROGRAM_ONE = require("./program-one")
const PROGRAM_TWO = require("./program-two")
const PROGRAM_THREE = require("./program-three")
const PROGRAM_FOUR = require("./program-four")

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  autoIndex: true
});

async function createPrograms(){
  console.log("Starting")
  let resultDrop = await PolicySchema.collection.drop()
  console.log(resultDrop)
  let result_ONE = await makeDocuments(PROGRAM_ONE)
  console.log(result_ONE)
  let result_TWO = await makeDocuments(PROGRAM_TWO)
  console.log(result_TWO)
  let result_THREE = await makeDocuments(PROGRAM_THREE)
  console.log(result_THREE)
  let result_FOUR = await makeDocuments(PROGRAM_FOUR)
  console.log(result_FOUR)
  console.log("Awaiting")
  mongoose.disconnect()
  console.log("Done")
}


async function makeDocuments(program){
  let uuid = Math.floor(Math.random() * 1000000000) + "" + Date.now()
  for(let policyIndex = 0; policyIndex < program.Policies.length; policyIndex++){
      let newPolicy = new PolicySchema()
      newPolicy['globalPolicyID'] = uuid
      newPolicy['creationEmail'] = program.email
      newPolicy['status_name'] = program.status
      // Policy
      let allKeys = Object.keys(program.Policies[policyIndex])
      allKeys.forEach(function(value) {
          newPolicy[value] = {...newPolicy[value], Value: program.Policies[policyIndex][value]}
      });
      // Terms
      for(let termsIndex = 0; termsIndex < program.Terms.length; termsIndex++){
          let termElement = new TermSchema()
          if(program.Terms[termsIndex].country_id == "All" || program.Policies[policyIndex].country_id == program.Terms[termsIndex].country_id){
              let allTermKeys = Object.keys(program.Terms[termsIndex])
              allTermKeys.forEach(function(value) {
                  termElement[value] = {...termElement[value], Value: program.Terms[termsIndex][value] }
              });
              newPolicy.Terms.push(termElement)
          }
      }
      // Exposures
      for(let exposuresIndex = 0; exposuresIndex < program.Exposures.length; exposuresIndex++){
          if(program.Exposures[exposuresIndex].country_id == "All" || program.Policies[policyIndex].country_id == program.Exposures[exposuresIndex].country_id){
              let allExposureKeys = Object.keys(program.Exposures[exposuresIndex])
              let exposureElement = new ExposureSchema()
              allExposureKeys.forEach(function(value) {
                  exposureElement[value] = {...exposureElement[value], Value: program.Exposures[exposuresIndex][value] }
              });
              newPolicy.Exposures.push(exposureElement)
          }
      }
      await newPolicy.save()
  }
  return true
}

createPrograms()