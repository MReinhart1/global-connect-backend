const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,     
        required: true,
        unique: true
    },
    notes: { type: [String]}
});

module.exports = mongoose.model("CountrySchema", CountrySchema);

