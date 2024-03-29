var validate = require('mongoose-validator');
const COUNTRIES = require("../constants/countries")


// https://github.com/validatorjs/validator.js


const country_id_validation = [
    validate({
      validator: 'isLength',
      arguments: [1, 70],
      message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
      validator: 'isAscii',
      message: 'Name should contain isAscii characters only',
    }),
    validate({
      validator: function(val){
        return COUNTRIES.includes(val)
      },
      message: "{VALUE} is not a valid country",
    })
];

module.exports = { country_id_validation }
