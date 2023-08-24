const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')

const ExposureSchema = new mongoose.Schema({
    globalPolicyID: {
        type: String,
        required: true
    },
    country_id: {
        type: String,
        required: false,
        validate: country_id_validation
    },
    location_id: {
        type: String,
        required: true,
    },
    location_address: {
        type: String,
        required: false,
    },
    lob_id: {
        type: String,
        required: false,
    },
    sic_id: {
        type: String,
        required: false,
    },
    basis_id: {
        type: String,
        required: false,
    },
    exposure_amt: {
        type: Number,
        required: false,
    },
    per_amt: {
        type: Number,
        required: false,
    },

});

module.exports = mongoose.model("ExposureSchema", ExposureSchema);
