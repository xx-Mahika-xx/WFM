const mongoose = require('mongoose');

const Job = require('../models/Job'); 
const Available = require('../models/Available');

async function fetchAttendanceWithFilters({ date, department}) {
    try {
        const pipeline = [
            {
                $match: {
                    date: new Date(date),
                    department: department
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
                "username": "$userDetails.username"
            }
          },
          {
              $project: {
                  _id: 0,
                  slot: 1,
                  credits: 1,
                  employeeId: 1,
                  "username":1
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

module.exports = { fetchAttendanceWithFilters, fetchAvailableEmployeesWithFilters };

