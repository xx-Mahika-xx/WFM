const mongoose = require("mongoose");

const Leave = new mongoose.Schema({
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
    
});

const LeaveModel = mongoose.model('Leave', Leave);

module.exports = LeaveModel;