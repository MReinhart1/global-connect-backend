const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')

const ExposureSchema = new mongoose.Schema({
    globalPolicyID: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean, 
        default: false
    },
    country_id: {
        "Value": { type: String, validate: country_id_validation },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
        
    },
    location_id: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: true }
    },
    location_address: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    lob_id: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    sic_id: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    basis_id: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    exposure_amt: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    per_amt: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
});

ExposureSchema.pre(['find', 'findOne', "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate"], function() {
    this._conditions = {...this._conditions, deleted: false}
});

module.exports = mongoose.model("ExposureSchema", ExposureSchema);
