const mongoose = require("mongoose");

const Job = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
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
        type: [Number],
        required: true,
    },
    status: {
        type: String,
        enum: ['working', 'available', 'notavailable', 'onleave'], 
        default: 'notavailable',
    },
});

const JobModel = mongoose.model('Job', Job);

module.exports = JobModel;
// Employee work timings