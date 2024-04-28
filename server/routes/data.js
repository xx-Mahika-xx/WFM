const express = require('express');
const router = express.Router();
const Job = require('../models/Job');



router.get('/filtered-data', async(req, res) => {
    try{
        const {department, date}= req.query;
        const filteredData = await fetchDataWithFilters({department, date});
        res.json(filteredData);
    }
    catch (error) {
        console.error('Error fetching filtered data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add-data', async(req, res) => {
    const {employeeId, department, slot, status}  = req.body;

    const today = new Date();
    const newEntryData = {
        employeeId,
        department,
        date: today,
        slot,
        status,
    }
    const newEntry = await Job.create(newEntryData);
    console.log(newEntry);
    console.log("shailesh");
    // const entryToReturn = { ...newEntry.toJSON()};

    return res.status(200);
});

module.exports = router;