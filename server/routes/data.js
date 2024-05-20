const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Available = require("../models/Available");
const {
  fetchAttendanceWithFilters,
  fetchAvailableEmployeesWithFilters,
  changeJobStatus,
  getUserInfoFromUsername,
  getCalendarData,
  getUserInfoFromEmployeeId,
} = require("../utils/jobhelper");
const {
  changeLeaveStatus,
  fetchLeaveData,
  getRemainingLeaveForEmployee,
  deductLeaves,
} = require("../utils/leavehelper");
const LeaveModel = require("../models/Leave");
const { updateCredits } = require("../utils/creditManager");
const RequirementModel = require("../models/requirement");
const UserDetailModel = require("../models/Userdetail");


const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Specify the upload directory

router.post("/add-csv-data", upload.single('csvFile'), async (req, res) => {
  try {
    const newEntries = [];

    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Read CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        // Process each row of the CSV file
        console.log("row" , row);
        const { employeeId, department, unit, date, slot, status } = row;
        const parsedSlot = JSON.parse(slot).map(Number);
        const parsedDate = new Date(date);
        const newEntryData = {
          employeeId,
          department,
          unit,
          date: parsedDate,
          slot: parsedSlot,
          status,
        };

        console.log("newEntryData ->", newEntryData);
        // Create new entry in database
        const newEntry = await Job.create(newEntryData);
        newEntries.push(newEntry);
      })
      .on('end', () => {
        // Delete uploaded file after processing
        fs.unlinkSync(filePath);
        console.log("CSV file processed successfully");
        console.log(newEntries);
        res.status(200).json({ message: "Entries added successfully" });
      });
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(500).json({ error: "Error processing CSV file" });
  }
});


// Define a function to create a new job entry
const createJobEntry = async (req, res) => {
  const { employeeId, department, unit, date, slot, status } = req.body;
  const newEntryData = {
    employeeId,
    department,
    unit,
    date,
    slot,
    status,
  };

  try {
    const newEntry = await Job.create(newEntryData);
    console.log("jobentry", newEntry);
    return res.status(200).json({ success: true, data: newEntry });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// API endpoint for adding job data
router.post("/add-data", async (req, res) => {
  createJobEntry(req, res);
});

// API endpoint for assigning an employee
router.post("/assign-employee", async (req, res) => {
  createJobEntry(req, res);
  const { employeeId } = req.body;
  await updateCredits({ credits: 1, employeeId });
});

router.post("/add-all-data", async (req, res) => {
  const entries = req.body; // Assuming req.body is an array of entry objects
  const newEntries = [];
  for (const entry of entries) {
    const { employeeId, department, unit, date, slot, status } = entry;
    const newEntryData = {
      employeeId,
      department,
      unit,
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
router.get("/getattendance", async (req, res) => {
  try {
    let { date, department, unit } = req.query;
    if (!date) {
      date = new Date();
      date.setHours(0, 0, 0, 0);
    }
    if (!department) {
      department = "General";
    }
    const result = await fetchAttendanceWithFilters({ date, department, unit });
    return res.json({
      success: true,
      date: date,
      department: department,
      unit: unit,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching attendance" });
  }
});

// get employees available for working in specific department, slot and date
router.get("/get-available-employees", async (req, res) => {
  try {
    let { date, department, slot } = req.query;
    
    const result = await fetchAvailableEmployeesWithFilters({
      date,
      department,
      slot,
    });
    return res.json({
      success: true,
      date: date,
      department: department,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching attendance" });
  }
});

// employee will add preference for working
router.post("/add-availability", async (req, res) => {
  const { username, startDate, endDate, slot } = req.body;

  const userInfo = await getUserInfoFromUsername({ username });
  const employeeId = userInfo.employeeId;
  const department = userInfo.department;
  // Convert start and end date strings to JavaScript Date objects
  const startLoop = new Date(startDate);
  const endLoop = new Date(endDate);

  // Array to hold all created entries
  const createdEntries = [];
  const updatedEntries = [];

  for (
    let currentDate = new Date(startLoop);
    currentDate <= endLoop;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const existingEntry = await Available.findOneAndUpdate(
      { employeeId, date: currentDate, department, slot },
      { $set: { slot: slot } },
      { new: true }
    );

    if (existingEntry) {
      updatedEntries.push(existingEntry);
    } else {
      const newEntryData = {
        employeeId,
        date: new Date(currentDate),
        department,
        slot,
      };

      const newEntry = await Available.create(newEntryData);
      createdEntries.push(newEntry);
    }
  }
  const allEntries = createdEntries.concat(updatedEntries);

  return res.status(200).json({ allEntries });
});

// apply for leave using this api
router.post("/apply-for-leave", async (req, res) => {
  const { userName, startDate, endDate, leaveType, reason } = req.body;
  const userInfo = await getUserInfoFromUsername({ username: userName });
  console.log(userInfo);
  const employeeId = userInfo.employeeId;
  const status = "pending";
  const newEntryData = {
    employeeId,
    startDate,
    endDate,
    leaveType,
    reason,
    status,
  };
  const newEntry = await LeaveModel.create(newEntryData);
  return res.status(200).json({ response: "Success" });
});

// to fetch the leave application data
router.get("/get-leave-data", async (req, res) => {
  try {
    let { status, username } = req.query;

    // Handle undefined status
    if (status === undefined) {
      status = null;
    }

    let employeeId = null;

    // Fetch employeeId if username is provided
    if (username !== undefined) {
      const userInfo = await getUserInfoFromUsername({ username });

      // Handle user not found
      if (!userInfo) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      employeeId = userInfo.employeeId;
    }

    // Fetch leave data based on status and employeeId
    let leaveData = await fetchLeaveData({ status, employeeId });

    const userdata = {};

    // Populate userdata with employee information
    let dataToSend = [];
    for (let leave of leaveData) {
      const user = await getUserInfoFromEmployeeId({
        employeeId: leave.employeeId,
      });
      const userInfo = await getUserInfoFromUsername({ username: user });

      // Handle user not found
      if (!userInfo) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      const department = userInfo.department;
      userdata[leave.employeeId] = {
        name: user,
        department: department,
      };
      let temp = {};
      if (leave["_doc"]) {
        temp = {
          ...leave["_doc"],
          username: userdata[leave.employeeId]?.name || "",
          department: userdata[leave.employeeId]?.department || "",
        };
      } else {
        temp = {
          ...leave,
          username: userdata[leave.employeeId]?.name || "",
          department: userdata[leave.employeeId]?.department || "",
        };
      }
      dataToSend.push(temp);
    }
    console.log(dataToSend);

    // Return the result
    return res.json({ data: dataToSend });
  } catch (error) {
    console.error("Error fetching LeaveData:", error);
    res.status(500).json({ success: false, error: "Error fetching LeaveData" });
  }
});

// use this api to approve or reject leave application
router.post("/change-leave-status", async (req, res) => {
  const { leaveId, username, toStatus } = req.body;
  console.log(leaveId, username, toStatus);
  const userInfo = await getUserInfoFromUsername({ username });
  console.log("This is user info:", userInfo);
  const employeeId = userInfo.employeeId;
  const result = await changeLeaveStatus({ leaveId, toStatus });

  if (toStatus === "approved") {
    const jobStatus = "onleave";
    const leaveType = result.leaveType;
    await deductLeaves({ employeeId, leaveType });
    const startDate = result.startDate;
    const endDate = result.endDate;
    const result2 = await changeJobStatus({
      employeeId,
      startDate,
      endDate,
      status: jobStatus,
    });
  }
  return res.status(200).json({ response: "success" });
});

router.get("/get-remaining-leave-for-employee", async (req, res) => {
  try {
    let { username } = req.query;
    const userInfo = await getUserInfoFromUsername({ username });
    const employeeId = userInfo.employeeId;
    const result = await getRemainingLeaveForEmployee({ employeeId });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching LeaveData:", error);
    res.status(500).json({ success: false, error: "Error fetching LeaveData" });
  }
});

router.post("/add-requirement", async (req, res) => {
  const { date, department, unit, slot, requirement } = req.body;
  const newEntryData = {
    date,
    department,
    unit,
    slot,
    requirement,
  };
  const newEntry = await RequirementModel.create(newEntryData);
  return res.status(200);
});

router.post("/add-user-detail", async (req, res) => {
  const { employeeId, department, casual_leave, sick_leave, paid_leave } =
    req.body;
  const newEntryData = {
    employeeId,
    department,
    casual_leave,
    sick_leave,
    paid_leave,
  };
  const newEntry = await UserDetailModel.create(newEntryData);
  return res.status(200);
});

router.get("/get-calendar-data-for-employee", async (req, res) => {
  try {
    let { username } = req.query;
    const userInfo = await getUserInfoFromUsername({ username });
    const employeeId = userInfo.employeeId;
    const result = await getCalendarData({ employeeId });
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching Calendar:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching Calendar Data" });
  }
});

module.exports = router;
