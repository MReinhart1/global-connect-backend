const mongoose = require('mongoose');
const CountrySchema = require("../../schemas/countries")
const COUNTRIES = require("../../schemas/constants/countries")
require('dotenv').config({path:__dirname+'/../../.env'})



async function createCountries(){
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { autoIndex: true });
    await CountrySchema.collection.drop()
    await CountrySchema.create({
     name: "All",
     notes: []
    })
    await CountrySchema.create({
     name: "Afghanistan",
     notes: []
    })
    await CountrySchema.create({
     name: "Albania",
     notes: []
    })
    await CountrySchema.create({
     name: "Algeria",
     notes: []
    })
    await CountrySchema.create({
     name: "Andorra",
     notes: []
    })
    await CountrySchema.create({
     name: "Angola",
     notes: []
    })
    await CountrySchema.create({
     name: "Antigua and Barbuda",
     notes: []
    })
    await CountrySchema.create({
     name: "Argentina",
     notes: []
    })
    await CountrySchema.create({
     name: "Armenia",
     notes: []
    })
    await CountrySchema.create({
     name: "Australia",
     notes: []
    })
    await CountrySchema.create({
     name: "Austria",
     notes: []
    })
    await CountrySchema.create({
     name: "Azerbaijan",
     notes: []
    })
    await CountrySchema.create({
     name: "Bahamas",
     notes: []
    })
    await CountrySchema.create({
     name: "Bahrain",
     notes: []
    })
    await CountrySchema.create({
     name: "Bangladesh",
     notes: []
    })
    await CountrySchema.create({
     name: "Barbados",
     notes: []
    })
    await CountrySchema.create({
     name: "Belarus",
     notes: []
    })
    await CountrySchema.create({
     name: "Belgium",
     notes: []
    })
    await CountrySchema.create({
     name: "Belize",
     notes: []
    })
    await CountrySchema.create({
     name: "Benin",
     notes: []
    })
    await CountrySchema.create({
     name: "Bhutan",
     notes: []
    })
    await CountrySchema.create({
     name: "Bolivia",
     notes: []
    })
    await CountrySchema.create({
     name: "Bosnia and Herzegovina",
     notes: []
    })
    await CountrySchema.create({
     name: "Botswana",
     notes: []
    })
    await CountrySchema.create({
     name: "Brazil",
     notes: []
    })
    await CountrySchema.create({
     name: "Brunei",
     notes: []
    })
    await CountrySchema.create({
     name: "Bulgaria",
     notes: []
    })
    await CountrySchema.create({
     name: "Burkina Faso",
     notes: []
    })
    await CountrySchema.create({
     name: "Burundi",
     notes: []
    })
    await CountrySchema.create({
     name: "Côte d'Ivoire",
     notes: []
    })
    await CountrySchema.create({
     name: "Cabo Verde",
     notes: []
    })
    await CountrySchema.create({
     name: "Cambodia",
     notes: []
    })
    await CountrySchema.create({
     name: "Cameroon",
     notes: []
    })
    await CountrySchema.create({
     name: "Canada",
     notes: []
    })
    await CountrySchema.create({
     name: "Central African Republic",
     notes: []
    })
    await CountrySchema.create({
     name: "Chad",
     notes: []
    })
    await CountrySchema.create({
     name: "Chile",
     notes: []
    })
    await CountrySchema.create({
     name: "China",
     notes: []
    })
    await CountrySchema.create({
     name: "Colombia",
     notes: []
    })
    await CountrySchema.create({
     name: "Comoros",
     notes: []
    })
    await CountrySchema.create({
     name: "Congo (Congo-Brazzaville)",
     notes: []
    })
    await CountrySchema.create({
     name: "Costa Rica",
     notes: []
    })
    await CountrySchema.create({
     name: "Croatia",
     notes: []
    })
    await CountrySchema.create({
     name: "Cuba",
     notes: []
    })
    await CountrySchema.create({
     name: "Cyprus",
     notes: []
    })
    await CountrySchema.create({
     name: "Czechia (Czech Republic)",
     notes: []
    })
    await CountrySchema.create({
     name: "Democratic Republic of the Congo",
     notes: []
    })
    await CountrySchema.create({
     name: "Denmark",
     notes: []
    })
    await CountrySchema.create({
     name: "Djibouti",
     notes: []
    })
    await CountrySchema.create({
     name: "Dominica",
     notes: []
    })
    await CountrySchema.create({
     name: "Dominican Republic",
     notes: []
    })
    await CountrySchema.create({
     name: "Ecuador",
     notes: []
    })
    await CountrySchema.create({
     name: "Egypt",
     notes: []
    })
    await CountrySchema.create({
     name: "El Salvador",
     notes: []
    })
    await CountrySchema.create({
     name: "Equatorial Guinea",
     notes: []
    })
    await CountrySchema.create({
     name: "Eritrea",
     notes: []
    })
    await CountrySchema.create({
     name: "Estonia",
     notes: []
    })
    await CountrySchema.create({
     name: "Eswatini",
     notes: []
    })
    await CountrySchema.create({
     name: "Swaziland",
     notes: []
    })
    await CountrySchema.create({
     name: "Ethiopia",
     notes: []
    })
    await CountrySchema.create({
     name: "Fiji",
     notes: []
    })
    await CountrySchema.create({
     name: "Finland",
     notes: []
    })
    await CountrySchema.create({
     name: "France",
     notes: []
    })
    await CountrySchema.create({
     name: "Gabon",
     notes: []
    })
    await CountrySchema.create({
     name: "Gambia",
     notes: []
    })
    await CountrySchema.create({
     name: "Georgia",
     notes: []
    })
    await CountrySchema.create({
     name: "Germany",
     notes: []
    })
    await CountrySchema.create({
     name: "Ghana",
     notes: []
    })
    await CountrySchema.create({
     name: "Greece",
     notes: []
    })
    await CountrySchema.create({
     name: "Grenada",
     notes: []
    })
    await CountrySchema.create({
     name: "Guatemala",
     notes: []
    })
    await CountrySchema.create({
     name: "Guinea",
     notes: []
    })
    await CountrySchema.create({
     name: "Guinea-Bissau",
     notes: []
    })
    await CountrySchema.create({
     name: "Guyana",
     notes: []
    })
    await CountrySchema.create({
     name: "Haiti",
     notes: []
    })
    await CountrySchema.create({
     name: "Holy See",
     notes: []
    })
    await CountrySchema.create({
     name: "Honduras",
     notes: []
    })
    await CountrySchema.create({
     name: "Hungary",
     notes: []
    })
    await CountrySchema.create({
     name: "Iceland",
     notes: []
    })
    await CountrySchema.create({
     name: "India",
     notes: []
    })
    await CountrySchema.create({
     name: "Indonesia",
     notes: []
    })
    await CountrySchema.create({
     name: "Iran",
     notes: []
    })
    await CountrySchema.create({
     name: "Iraq",
     notes: []
    })
    await CountrySchema.create({
     name: "Ireland",
     notes: []
    })
    await CountrySchema.create({
     name: "Israel",
     notes: []
    })
    await CountrySchema.create({
     name: "Italy",
     notes: []
    })
    await CountrySchema.create({
     name: "Jamaica",
     notes: []
    })
    await CountrySchema.create({
     name: "Japan",
     notes: []
    })
    await CountrySchema.create({
     name: "Jordan",
     notes: []
    })
    await CountrySchema.create({
     name: "Kazakhstan",
     notes: []
    })
    await CountrySchema.create({
     name: "Kenya",
     notes: []
    })
    await CountrySchema.create({
     name: "Kiribati",
     notes: []
    })
    await CountrySchema.create({
     name: "Kuwait",
     notes: []
    })
    await CountrySchema.create({
     name: "Kyrgyzstan",
     notes: []
    })
    await CountrySchema.create({
     name: "Laos",
     notes: []
    })
    await CountrySchema.create({
     name: "Latvia",
     notes: []
    })
    await CountrySchema.create({
     name: "Lebanon",
     notes: []
    })
    await CountrySchema.create({
     name: "Lesotho",
     notes: []
    })
    await CountrySchema.create({
     name: "Liberia",
     notes: []
    })
    await CountrySchema.create({
     name: "Libya",
     notes: []
    })
    await CountrySchema.create({
     name: "Liechtenstein",
     notes: []
    })
    await CountrySchema.create({
     name: "Lithuania",
     notes: []
    })
    await CountrySchema.create({
     name: "Luxembourg",
     notes: []
    })
    await CountrySchema.create({
     name: "Madagascar",
     notes: []
    })
    await CountrySchema.create({
     name: "Malawi",
     notes: []
    })
    await CountrySchema.create({
     name: "Malaysia",
     notes: []
    })
    await CountrySchema.create({
     name: "Maldives",
     notes: []
    })
    await CountrySchema.create({
     name: "Mali",
     notes: []
    })
    await CountrySchema.create({
     name: "Malta",
     notes: []
    })
    await CountrySchema.create({
     name: "Marshall Islands",
     notes: []
    })
    await CountrySchema.create({
     name: "Mauritania",
     notes: []
    })
    await CountrySchema.create({
     name: "Mauritius",
     notes: []
    })
    await CountrySchema.create({
     name: "Mexico",
     notes: []
    })
    await CountrySchema.create({
     name: "Micronesia",
     notes: []
    })
    await CountrySchema.create({
     name: "Moldova",
     notes: []
    })
    await CountrySchema.create({
     name: "Monaco",
     notes: []
    })
    await CountrySchema.create({
     name: "Mongolia",
     notes: []
    })
    await CountrySchema.create({
     name: "Montenegro",
     notes: []
    })
    await CountrySchema.create({
     name: "Morocco",
     notes: []
    })
    await CountrySchema.create({
     name: "Mozambique",
     notes: []
    })
    await CountrySchema.create({
     name: "Myanmar (formerly Burma)",
     notes: []
    })
    await CountrySchema.create({
     name: "Namibia",
     notes: []
    })
    await CountrySchema.create({
     name: "Nauru",
     notes: []
    })
    await CountrySchema.create({
     name: "Nepal",
     notes: []
    })
    await CountrySchema.create({
     name: "Netherlands",
     notes: []
    })
    await CountrySchema.create({
     name: "New Zealand",
     notes: []
    })
    await CountrySchema.create({
     name: "Nicaragua",
     notes: []
    })
    await CountrySchema.create({
     name: "Niger",
     notes: []
    })
    await CountrySchema.create({
     name: "Nigeria",
     notes: []
    })
    await CountrySchema.create({
     name: "North Korea",
     notes: []
    })
    await CountrySchema.create({
     name: "North Macedonia",
     notes: []
    })
    await CountrySchema.create({
     name: "Norway",
     notes: []
    })
    await CountrySchema.create({
     name: "Oman",
     notes: []
    })
    await CountrySchema.create({
     name: "Pakistan",
     notes: []
    })
    await CountrySchema.create({
     name: "Palau",
     notes: []
    })
    await CountrySchema.create({
     name: "Palestine State",
     notes: []
    })
    await CountrySchema.create({
     name: "Panama",
     notes: []
    })
    await CountrySchema.create({
     name: "Papua New Guinea",
     notes: []
    })
    await CountrySchema.create({
     name: "Paraguay",
     notes: []
    })
    await CountrySchema.create({
     name: "Peru",
     notes: []
    })
    await CountrySchema.create({
     name: "Philippines",
     notes: []
    })
    await CountrySchema.create({
     name: "Poland",
     notes: []
    })
    await CountrySchema.create({
     name: "Portugal",
     notes: []
    })
    await CountrySchema.create({
     name: "Qatar",
     notes: []
    })
    await CountrySchema.create({
     name: "Romania",
     notes: []
    })
    await CountrySchema.create({
     name: "Russia",
     notes: []
    })
    await CountrySchema.create({
     name: "Rwanda",
     notes: []
    })
    await CountrySchema.create({
     name: "Saint Kitts and Nevis",
     notes: []
    })
    await CountrySchema.create({
     name: "Saint Lucia",
     notes: []
    })
    await CountrySchema.create({
     name: "Saint Vincent and the Grenadines",
     notes: []
    })
    await CountrySchema.create({
     name: "Samoa",
     notes: []
    })
    await CountrySchema.create({
     name: "San Marino",
     notes: []
    })
    await CountrySchema.create({
     name: "Sao Tome and Principe",
     notes: []
    })
    await CountrySchema.create({
     name: "Saudi Arabia",
     notes: []
    })
    await CountrySchema.create({
     name: "Senegal",
     notes: []
    })
    await CountrySchema.create({
     name: "Serbia",
     notes: []
    })
    await CountrySchema.create({
     name: "Seychelles",
     notes: []
    })
    await CountrySchema.create({
     name: "Sierra Leone",
     notes: []
    })
    await CountrySchema.create({
     name: "Singapore",
     notes: []
    })
    await CountrySchema.create({
     name: "Slovakia",
     notes: []
    })
    await CountrySchema.create({
     name: "Slovenia",
     notes: []
    })
    await CountrySchema.create({
     name: "Solomon Islands",
     notes: []
    })
    await CountrySchema.create({
     name: "Somalia",
     notes: []
    })
    await CountrySchema.create({
     name: "South Africa",
     notes: []
    })
    await CountrySchema.create({
     name: "South Korea",
     notes: []
    })
    await CountrySchema.create({
     name: "South Sudan",
     notes: []
    })
    await CountrySchema.create({
     name: "Spain",
     notes: []
    })
    await CountrySchema.create({
     name: "Sri Lanka",
     notes: []
    })
    await CountrySchema.create({
     name: "Sudan",
     notes: []
    })
    await CountrySchema.create({
     name: "Suriname",
     notes: []
    })
    await CountrySchema.create({
     name: "Sweden",
     notes: []
    })
    await CountrySchema.create({
     name: "Switzerland",
     notes: []
    })
    await CountrySchema.create({
     name: "Syria",
     notes: []
    })
    await CountrySchema.create({
     name: "Tajikistan",
     notes: []
    })
    await CountrySchema.create({
     name: "Tanzania",
     notes: []
    })
    await CountrySchema.create({
     name: "Thailand",
     notes: []
    })
    await CountrySchema.create({
     name: "Timor-Leste",
     notes: []
    })
    await CountrySchema.create({
     name: "Togo",
     notes: []
    })
    await CountrySchema.create({
     name: "Tonga",
     notes: []
    })
    await CountrySchema.create({
     name: "Trinidad and Tobago",
     notes: []
    })
    await CountrySchema.create({
     name: "Tunisia",
     notes: []
    })
    await CountrySchema.create({
     name: "Turkey",
     notes: []
    })
    await CountrySchema.create({
     name: "Turkmenistan",
     notes: []
    })
    await CountrySchema.create({
     name: "Tuvalu",
     notes: []
    })
    await CountrySchema.create({
     name: "Uganda",
     notes: []
    })
    await CountrySchema.create({
     name: "Ukraine",
     notes: []
    })
    await CountrySchema.create({
     name: "United Arab Emirates",
     notes: []
    })
    await CountrySchema.create({
     name: "United Kingdom",
     notes: []
    })
    await CountrySchema.create({
     name: "United States",
     notes: []
    })
    await CountrySchema.create({
     name: "Uruguay",
     notes: []
    })
    await CountrySchema.create({
     name: "Uzbekistan",
     notes: []
    })
    await CountrySchema.create({
     name: "Vanuatu",
     notes: []
    })
    await CountrySchema.create({
     name: "Venezuela",
     notes: []
    })
    await CountrySchema.create({
     name: "Vietnam",
     notes: []
    })
    await CountrySchema.create({
     name: "Yemen",
     notes: []
    })
    await CountrySchema.create({
     name: "Zambia",
     notes: []
    })
    await CountrySchema.create({
     name: "Zimbabwe",
     notes: []
    })
    // for(let index = 0; index< COUNTRIES.length; index++){
    //     console.log("await CountrySchema.create({")
    //     console.log(` name: \"${COUNTRIES[index]}\",`)
    //     console.log(` notes: []`)
    //     console.log("})")
    // }
    mongoose.disconnect()
    console.log("Done")
}

createCountries()
