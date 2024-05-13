const mongoose = require('mongoose');

const Job = require('../models/Job'); 
const Available = require('../models/Available');
const { updateCredits } = require('./creditManager');
const RequirementModel = require('../models/requirement');
const User = require('../models/User');
const UserDetailModel = require('../models/Userdetail');

const MINIMUM_REQ=10;

async function fetchAttendanceWithFilters({ date, department, unit }) {
    try {
        
        const pipeline1 = [
            {
                $match: {
                    date: new Date(date),
                    department: department,
                    status: { $ne: "onleave" }
                }
            }
        ];

        const pipeline2 = [
            {
                $match: {
                    date: new Date(date),
                    department: department
                }
            }
        ];

        // Conditionally add the unit match stage
        if (unit !== undefined && unit !== null) {
            pipeline1[0].$match.unit = unit;
            pipeline2[0].$match.unit = unit;
        }

        pipeline1.push(
            {
                $unwind: "$slot"
            },
            {
                $group: {
                    _id: "$slot",
                    count: { $sum: 1 }
                }
            }
        );

        pipeline2.push(
            {
                $unwind: "$slot"
            },
            {
                $group: {
                    _id: "$slot",
                    requirement: { $sum: "$requirement" } // Fetching the single value for each slot
                }
            }
        );

        const [result1, result2] = await Promise.all([
            Job.aggregate(pipeline1),
            RequirementModel.aggregate(pipeline2)
        ]);

        // Create a map for faster lookup
        const result2Map = new Map(result2.map(item => [item._id, item.requirement]));

        // Combine results from both pipelines
        const combinedResult = [];
        for (let slot = 1; slot <= 6; slot++) {
            const result1Item = result1.find(item => item._id === slot);
            const requirement = result2Map.get(slot); // Get additional data for the slot
            if (result1Item) {
                combinedResult.push({
                    slot: result1Item._id,
                    count: result1Item.count,
                    requirement: requirement !== undefined ? requirement : MINIMUM_REQ // Ensure null if no requirement found
                });
            } else {
                combinedResult.push({
                    slot: slot,
                    count: 0,
                    requirement: requirement !== undefined ? requirement : 0 // Set requirement to zero if not found
                });
            }
        }


        return combinedResult;
    } catch (error) {
        console.error('Error fetching data with filters:', error);
        throw error;
    }
}

async function fetchAvailableEmployeesWithFilters({date, department, slot}){
    try {
        const pipeline = [];

        // Match stage to filter by department, date, and slot
        const matchStage = {
            $match: {
                department: department,
                date: new Date(date),
                slot: slot
            }
        };

        
        pipeline.push(matchStage);

        pipeline.push(
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
                    "credits": "$userDetails.credits",
                    "slot":slot
                }
            },
            {
                $project: {
                    _id: 0,
                    "slot": 1,
                    employeeId: 1,
                    "credits": 1,
                    "username": 1
                }
            },
        );

        const result = await Available.aggregate(pipeline); 
        const sortedResult = result.sort((a, b) => a.credits - b.credits);

        return sortedResult;
            
    }
    catch (error) {
        console.error('Error fetching data with filters:', error);
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

async function getUserInfoFromUsername({ username }) {
    try {
        // MongoDB query to find the user by username and retrieve their _id
        const user = await User.findOne({ username }, { _id: 1 });
        
        if (user) {
            const employeeId = user._id;
            // MongoDB query to find the job information based on the employeeId
            const userdetail = await UserDetailModel.findOne({ employeeId }, { department: 1 });
            if (userdetail) {
                return {
                    employeeId,
                    department: userdetail.department
                };
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user info:", error);
        return null;
    }
}

async function getUserInfoFromEmployeeId({ employeeId}) {
    try {
        // MongoDB query to find the user by username and retrieve their _id
        const user = await User.findOne({ _id: employeeId }, { username: 1 });
        if (user) {
            return user.username;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user info:", error);
        return null;
    }
}

async function getCalendarData({ employeeId }) {

    const aggregateQuery = [
        {
            $match: {
                employeeId: mongoose.Types.ObjectId(employeeId)
            }
        },
        {
            $unwind: "$slot"
        },
        {
            $project: {
                _id: 0,
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                slot:1,
                department: 1
            }
        },
        {
            $project: {
                result: {
                    $concat: [
                        "Duty in ", "$department", ", ", "$date", "T",
                        {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$slot", 1] }, then: "00:00" },
                                    { case: { $eq: ["$slot", 2] }, then: "04:00" },
                                    { case: { $eq: ["$slot", 3] }, then: "08:00" },
                                    { case: { $eq: ["$slot", 4] }, then: "12:00" },
                                    { case: { $eq: ["$slot", 5] }, then: "16:00" },
                                    { case: { $eq: ["$slot", 6] }, then: "20:00" }
                                ],
                                default: ""
                            }
                        },
                        " ,","$date", "T",
                        {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$slot", 1] }, then: "04:00" },
                                    { case: { $eq: ["$slot", 2] }, then: "08:00" },
                                    { case: { $eq: ["$slot", 3] }, then: "12:00" },
                                    { case: { $eq: ["$slot", 4] }, then: "16:00" },
                                    { case: { $eq: ["$slot", 5] }, then: "20:00" },
                                    { case: { $eq: ["$slot", 6] }, then: "24:00" }
                                ],
                                default: ""
                            }
                        },
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                results: { $push: "$result" }
            }
        },
        {
            $project: {
                _id: 0,
                results: 1
            }
        }
    ];

    try {
        const results = await Job.aggregate(aggregateQuery);
        if (results.length > 0) {
            const resultString = results[0].results.join("\n");
            const header = "title,startTime,endTime\n";
            return header + resultString;
        } else {
            return "No data found for the employee.";
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


module.exports = { fetchAttendanceWithFilters, fetchAvailableEmployeesWithFilters, 
    changeJobStatus, getUserInfoFromUsername, getCalendarData, getUserInfoFromEmployeeId };

