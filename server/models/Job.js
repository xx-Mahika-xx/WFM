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
    },
    department: {
        type: String,
        required: true,
    },
    slot: {
        type: Number,
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