const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
    min: [6, 'Too young'],
  },
  age2: {
    type: Number,
    default: 0,
    min: [6, 'Too young'],
  },
});

module.exports = mongoose.model("User", UserSchema);
