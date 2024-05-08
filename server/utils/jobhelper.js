const mongoose = require('mongoose');

const Job = require('../models/Job'); 
const Available = require('../models/Available');
const LeaveModel = require('../models/Leave');
const { updateCredits } = require('./creditManager');

async function fetchAttendanceWithFilters({ date, department}) {
    try {
        const pipeline = [
            {
                $match: {
                    date: new Date(date),
                    department: department,
                    status: { $ne: "onleave" }
                }
            },
            {
                $unwind: "$slot" 
            },
            {
                $group: {
                    _id: "$slot",
                    count: { $sum: 1 }
                }
            } 
        ];

        const result = await Job.aggregate(pipeline); 
        return result;
    } catch (error) {
        console.error('Error fetching data with filters:', error);
        throw error;
    }
}


async function fetchAvailableEmployeesWithFilters({date, department, slot}){
    try {
        const pipeline = [
            {
              $match: {
                department: department,
                date: new Date(date),
                slot: slot
              }
            },
            {
              $lookup: {
                  from: "users",
                  localField: "employeeId",
                  foreignField: "_id",
                  as: "userDetails"
              }
          },
          {
              $unwind: "$userDetails"
          },
          {
            $addFields: {
                "username": "$userDetails.username",
                "credits" : "$userDetails.credits"
            }
          },
          {
              $project: {
                  _id: 0,
                  slot: 1,
                  employeeId: 1,
                  "credits": 1,
                  "username":1
              }
          },
          {
                $sort: {
                    "credits": 1 
                }
            }
          ];
        const result = await Available.aggregate(pipeline); 
        return result;
            
    }
    catch (error) {
        console.error('Error fetching data with filters:', error);
        throw error;
    }
};

async function fetchLeaveData({status}){
    try {
        const pipeline = [];
        if (status !== undefined && status !== null) {
            pipeline.push({
                $match: {
                    status: status,
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


async function changeJobStatus({employeeId, startDate, endDate, status}){
    try {
        const updatedJobs = await Job.updateMany(
            {
                employeeId: employeeId,
                date: { $gte: startDate, $lte: endDate }
            },
            { status: status }
        );
        await updateCredits({credits : (-1 * updatedJobs.nModified), employeeId});

    } catch (error) {
        console.error('Error approving/rejecting leave:', error);
        throw error;
    }
};


module.exports = { fetchAttendanceWithFilters, fetchAvailableEmployeesWithFilters, fetchLeaveData, changeLeaveStatus, changeJobStatus };

