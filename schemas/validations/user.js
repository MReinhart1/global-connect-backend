var validate = require('mongoose-validator');

// https://github.com/validatorjs/validator.js

const username_validation = [
    validate({
      validator: 'isAscii',
      message: 'Must input valid characters',
    }),
    validate({
        validator: 'isLength',
        arguments: [1, 70],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters',
      }),
];

const email_validation = [
    validate({
      validator: 'isEmail',
      message: 'Must input a valid email',
    })
];

const password_validation = [
    validate({
        validator: 'isLength',
        arguments: [1, 70],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters',
    })
];

module.exports = { username_validation, password_validation, email_validation }




