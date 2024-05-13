const mongoose = require("mongoose");

const Leave = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        get: v => v.toISOString().split('T')[0],
        set: v => v
    },
    endDate: {
        type: Date,
        required: true,
        get: v => v.toISOString().split('T')[0],
        set: v => v
    },
    leaveType: {
        type: String,
        enum: ['sick', 'casual', 'paid']
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['pending', 'approved', 'rejected']
    },
    
});

const LeaveModel = mongoose.model('Leave', Leave);

module.exports = LeaveModel;