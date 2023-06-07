const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')

const ExposureSchema = new mongoose.Schema({
    country_id: {
        type: String,
        required: false,
        validate: country_id_validation
    },
    location_id: {
        type: String,
        required: false,
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
        type: String,
        required: false,
    },
    per_amt: {
        type: String,
        required: false,
    },

});
const ExposuresSchema = new mongoose.Schema({
    Exposures: {
      type: [ExposureSchema],
      required: true,
    },
    policyID: {
      type: String,
      required: true
    },
    companyName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Exposures", ExposuresSchema);
