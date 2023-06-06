var validate = require('mongoose-validator');


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
        return ["United States", "France", "Canada", "Germany", "All"].includes(val)
      },
      message: "Not a valid country",
    })
];

module.exports = { country_id_validation }
