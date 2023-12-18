const mongoose = require("mongoose");
const { country_id_validation } = require('./validations/policy')

const TermSchema = new mongoose.Schema({
    globalPolicyID: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean, 
        default: false
    },
    lob_id: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    form_txt: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    name_txt: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    order_nbr: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    description_txt: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    schedule_txt: {
        "Value": { type: String },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: false }
    },
    country_id: {
        "Value": { type: String, validate: country_id_validation },
        "Hover_Description": { type: String, default: "Whats the description?" },
        "Category": {type: String, default: "Terms" },
        "Display_Name": { type: String, default: "Info about this value" },
        "Editable": { type: Boolean, default: false },
        "Required": { type: Boolean, default: true }
    }
});

module.exports = mongoose.model("TermSchema", TermSchema);

