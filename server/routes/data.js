const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Available = require('../models/Available');
const { fetchAttendanceWithFilters, fetchAvailableEmployeesWithFilters } = require('../utils/jobhelper');


router.post('/add-data', async(req, res) => {
    const {employeeId, department, date, slot, status}  = req.body;
    const newEntryData = {
        employeeId,
        department,
        date,
        slot,
        status,
    }
    const newEntry = await Job.create(newEntryData);
    console.log(newEntry);

    return res.status(200);
});

router.post('/add-all-data', async (req, res) => {
    const entries = req.body; // Assuming req.body is an array of entry objects
    const newEntries = [];
    for (const entry of entries) {
        const { employeeId, department, date, slot, status } = entry;
        const newEntryData = {
            employeeId,
            department,
            date,
            slot,
            status,
        };

        
        const newEntry = await Job.create(newEntryData);
        newEntries.push(newEntry);
    }

    console.log(newEntries);

    return res.status(200).json({ message: "Entries added successfully" });
});


router.get('/getattendance', async (req, res) => {
    try {
        let { date, department } = req.body;
        if (!date) {
            date = new Date();
            date.setHours(0, 0, 0, 0);
        }
        if(!department){
            department="General";
        }
        const result = await fetchAttendanceWithFilters({date, department});
        return res.json({ success: true, "date":date, "department":department, data: result });
        
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ success: false, error: 'Error fetching attendance' });
    }
});

router.get('/get-available-employees', async (req, res) => {
    try {
        let { date, department, slot } = req.body;
        const result = await fetchAvailableEmployeesWithFilters({date, department, slot});
        return res.json({ success: true, "date":date, "department":department, data: result });
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ success: false, error: 'Error fetching attendance' });
    }
});

router.post('/add-availability', async (req,res) => {
    const {employeeId, date, department, slot, credits} = req.body;
    const newEntryData =  {
        employeeId, 
        date, 
        department, 
        slot, 
        credits
    }
    const newEntry = await Available.create(newEntryData);
    console.log(newEntry);
    return res.status(200);
});



module.exports = router;