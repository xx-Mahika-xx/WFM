import React, { useState, useEffect } from "react";
import axios from "axios";

const Leave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState(""); // Default to Casual Leave
  const [casualLeave, setCasualLeave] = useState(0);
  const [paidLeave, setPaidLeave] = useState(0);
  const [sickLeave, setSickLeave] = useState(0);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch leave data from the backend upon component mount
    fetchLeaveData();
  }, []);

  const fetchLeaveData = () => {
    // Simulate fetching leave data from the backend
    // Replace this with your actual API call to get leave data from the backend
    axios
      .get("your-backend-leave-data-endpoint")
      .then((response) => {
        const { casual, paid, sick } = response.data;
        setCasualLeave(casual);
        setPaidLeave(paid);
        setSickLeave(sick);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data to send to the backend
    const formData = {
      fromDate,
      toDate,
      reason,
      leaveType,
    };
    // Send data to the backend
    axios
      .post("your-backend-endpoint", formData)
      .then((response) => {
        // Handle success response
        setSuccessMessage("Leave application submitted successfully.");
        // Update leave data after successful submission
        fetchLeaveData();
      })
      .catch((error) => {
        console.error("Error submitting leave application:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-8 shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Leave Application Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fromDate"
            className="block mb-1 font-semibold text-gray-800"
          >
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="toDate"
            className="block mb-1 font-semibold text-gray-800"
          >
            To Date
          </label>
          <input
            type="date"
            id="toDate"
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="reason"
            className="block mb-1 font-semibold text-gray-800"
          >
            Reason
          </label>
          <textarea
            id="reason"
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="leaveType"
            className="block mb-1 font-semibold text-gray-800"
          >
            Leave Type
          </label>
          <select
            id="leaveType"
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="Casual">Casual Leave</option>
            <option value="Paid">Paid Leave</option>
            <option value="Sick">Sick Leave</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-1 text-gray-800">Remaining Leaves:</p>
          <p className="text-green-600">Casual Leave: {casualLeave}</p>
          <p className="text-blue-600">Paid Leave: {paidLeave}</p>
          <p className="text-red-600">Sick Leave: {sickLeave}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Leave;
