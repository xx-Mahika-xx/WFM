const mongoose = require("mongoose");

const Requirement = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        get: v => v.toISOString().split('T')[0],
        set: v => v
    },
    department: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
    },
    slot: {
        type: Number,
        required: true,
    },
    requirement: {
        type: Number,
        required: true,
    },
});

const RequirementModel = mongoose.model('Requirement', Requirement);

module.exports = RequirementModel;