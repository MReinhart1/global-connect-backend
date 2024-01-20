const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,     
        required: true,
        unique: true
    },
    deleted: {type: Boolean, default: false},
    notes: { type: [String]}
});

CountrySchema.pre(['find', 'findOne', "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate"], function() {
    this._conditions = {...this._conditions, deleted: false}
});
module.exports = mongoose.model("CountrySchema", CountrySchema);

