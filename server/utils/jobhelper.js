const mongoose = require('mongoose');

const Job = require('../models/Job'); 

async function fetchDataWithFilters({ department, date }) {
    try {
        const dateObj = new Date(date);

        const pipeline = [
            {
                $match: {
                    date: dateObj,
                    department: department
                }
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




module.exports = { fetchDataWithFilters };
