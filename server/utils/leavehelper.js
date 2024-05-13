const mongoose = require('mongoose');
const LeaveModel = require('../models/Leave');
const UserDetailModel = require('../models/Userdetail');
const { ObjectId } = require('mongodb');

async function fetchLeaveData({status, employeeId}){
    try {
        const pipeline = [];
        if (status !== undefined && status !== null) {
            pipeline.push({
                $match: {
                    status: status,
                }
            });
        }
        if (employeeId !== undefined && employeeId !== null) {
            pipeline.push({
                $match: {
                    employeeId: employeeId,
                }
            });
        }
        if (pipeline.length === 0) {
            return await LeaveModel.find();
        }
        return await LeaveModel.aggregate(pipeline); 
    } catch (error) {
        console.error('Error fetching data with filters:', error);
        throw error;
    }
};

async function changeLeaveStatus({leaveId, toStatus}){
    try {
        const updatedLeave = await LeaveModel.findByIdAndUpdate(
            leaveId,
            { status: toStatus },
            { new: true } // To return the updated document
        );

        if (!updatedLeave) {
            throw new Error("Leave entry not found");
        }

        return updatedLeave;
    } catch (error) {
        console.error('Error approving/rejecting leave:', error);
        throw error;
    }
};

async function getRemainingLeaveForEmployee({employeeId}) {
    try {
        const userDetail = await UserDetailModel.findOne({ employeeId});

        if (userDetail) {
            const { casual_leave, sick_leave, paid_leave } = userDetail;
            return { casual_leave, sick_leave, paid_leave };
        } else {
            throw new Error(`User detail not found for employeeId: ${employeeId}`);
        }
    } catch (error) {
        console.error('Error fetching user detail:', error);
        throw error;
    }
}


module.exports = {fetchLeaveData, changeLeaveStatus, getRemainingLeaveForEmployee};