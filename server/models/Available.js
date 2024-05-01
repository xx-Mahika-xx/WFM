const mongoose = require("mongoose");

const Available = new mongoose.Schema({
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
    slot: {
        type: [Number],
        required: true,
    },
    credits: {
        type: Number,
        required: true,
        default: 0,
    }
});

const AvailableModel = mongoose.model('Available', Available);

module.exports = AvailableModel;