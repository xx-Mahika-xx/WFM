const mongoose = require('mongoose');

const Job = require('../models/Job'); 
const Available = require('../models/Available');
const LeaveModel = require('../models/Leave');
const User = require('../models/User');

async function updateCredits({credits, employeeId}){
    try {
        const employee = await User.findById(employeeId);
        
        const newCredits = employee.credits + credits;

        const updatedUser = await User.findByIdAndUpdate(
            employeeId,
            { credits: newCredits },
            { new: true }
        );

        return updatedUser;
    } catch (error) {
        console.error('Error updating credits:', error);
        throw error;
    }
}

module.exports = {updateCredits};