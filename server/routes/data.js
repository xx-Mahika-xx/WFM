const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Available = require('../models/Available');
const { fetchAttendanceWithFilters, fetchAvailableEmployeesWithFilters, fetchLeaveData, changeLeaveStatus, changeJobStatus } = require('../utils/jobhelper');
const LeaveModel = require('../models/Leave');
const { updateCredits } = require('../utils/creditManager');
const RequirementModel = require('../models/requirement');


// Define a function to create a new job entry
const createJobEntry = async (req, res) => {
    const { employeeId, department, date, slot, status } = req.body;
    const newEntryData = {
        employeeId,
        department,
        date,
        slot,
        status,
    };

    try {
        const newEntry = await Job.create(newEntryData);
        console.log(newEntry);
        return res.status(200).json({ success: true, data: newEntry });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// API endpoint for adding job data
router.post('/add-data', async (req, res) => {
    createJobEntry(req, res);
});

// API endpoint for assigning an employee
router.post('/assign-employee', async (req, res) => {
    createJobEntry(req, res);
    const {employeeId} = req.body;
    await updateCredits({credits: 1, employeeId});
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

// get the attendance slotwise, datewise and by department
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

// get employees available for working in specific department, slot and date
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

// employee will add preference for working
router.post('/add-availability', async (req, res) => {
    const { employeeId, startDate, endDate, department, slot } = req.body;
    
    // Convert start and end date strings to JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Array to hold all created entries
    const createdEntries = [];

    for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
        const newEntryData = {
            employeeId,
            date: new Date(currentDate),
            department,
            slot
        };

        const newEntry = await Available.create(newEntryData);
        createdEntries.push(newEntry);
    }

    return res.status(200).json({ createdEntries });
});


// apply for leave using this api
router.post('/apply-for-leave', async (req, res) =>{
    const {employeeId, startDate, endDate, leavetype} = req.body;
    const status = "pending"; 
    const newEntryData = {
        employeeId,
        startDate,
        endDate,
        leaveType,
        status
    }
    const newEntry = await LeaveModel.create(newEntryData);
    return res.status(200);
});

// to fetch the leave application data
router.get('/get-leave-data', async (req,res) => {
    try {
        let { status } = req.body;
        if (status === undefined) {
            status = null;
        }
        const result = await fetchLeaveData({status});
        return res.json({ success: true,  data: result });
    } catch (error) {
        console.error('Error fetching LeaveData:', error);
        res.status(500).json({ success: false, error: 'Error fetching LeaveData' });
    }
});

// use this api to approve or reject leave application
router.post('/change-leave-status', async (req, res) => {
    const {leaveId, employeeId, startDate, endDate, toStatus} = req.body;
    const result = await changeLeaveStatus({leaveId, toStatus});
    if(toStatus === "approved"){
        const jobStatus  = "onleave";
        const result2 = await changeJobStatus({employeeId, startDate, endDate, status: jobStatus});
    }
    return res.status(200);

});

router.post('/add-requirement', async (req,res) =>{
    const {date, department, slot, requirement} = req.body;
    const newEntryData = {
        date,
        department,
        slot,
        requirement
    }
    const newEntry = await RequirementModel.create(newEntryData);
    return res.status(200);
    
});

module.exports = router;