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
    unit: {
        type: String,
    },
    slot: {
        type: [Number],
        required: true,
    },
});

const AvailableModel = mongoose.model('Available', Available);

module.exports = AvailableModel;