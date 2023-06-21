const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')

const TermSchema = new mongoose.Schema({
    lob_id: {
        type: String,
        required: false
    },
    form_txt: {
        type: String,
        required: false
    },
    name_txt: {
        type: String,
        required: false
    },
    order_nbr: {
        type: String,
        required: false
    },
    description_txt: {
        type: String,
        required: false
    },
    schedule_txt: {
        type: String,
        required: false
    },
    country_id: {
        type: String,
        required: true,
        validate: country_id_validation
    }
});

const TermsSchema = new mongoose.Schema({
    Terms: {
      type: [TermSchema],
      required: true,
    },
    policyID: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model("TermsSchema", TermsSchema);
