import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../utils/config";
import { getUsernameFromCookie } from "../utils/userUtil";
axios.defaults.baseURL = backendUrl;

const Leave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("casual"); // Default to Casual Leave
  let [casual_leave, setCasualLeave] = useState(0);
  let [paid_leave, setPaidLeave] = useState(0);
  let [sick_leave, setSickLeave] = useState(0);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch leave data from the backend upon component mount
    fetchLeaveData();
  }, []);

  const userName = getUsernameFromCookie();
  const fetchLeaveData = async () => {
    // Simulate fetching leave data from the backend
    // Replace this with your actual API call to get leave data from the backend
    axios
      .get("/data/get-remaining-leave-for-employee", {
        params: {
          username: userName,
        },
      })
      .then((response) => {
        let { casual_leave, paid_leave, sick_leave } = response.data.data;
        setCasualLeave(casual_leave);
        setPaidLeave(paid_leave);
        setSickLeave(sick_leave);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data to send to the backend
    const formData = {
      startDate: fromDate,
      endDate: toDate,
      reason,
      leaveType: leaveType,
      userName
    };
    console.log(formData);
    // Send data to the backend
    axios
      .post("/data/apply-for-leave", formData)
      .then((response) => {
        setFromDate("");
        setToDate("");
        setReason("");
        setLeaveType("casual");
        fetchLeaveData();
      })
      .catch((error) => {
        console.error("Error submitting leave application:", error);
      });
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    return `${year}-${month}-${day}`;
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
            min={getTodayDate()}
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
            min={fromDate || getTodayDate()}
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
            <option value="casual">Casual Leave</option>
            <option value="paid">Paid Leave</option>
            <option value="sick">Sick Leave</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-1 text-gray-800">Remaining Leaves:</p>
          <p className="text-green-600">Casual Leave: {casual_leave}</p>
          <p className="text-blue-600">Paid Leave: {paid_leave}</p>
          <p className="text-red-600">Sick Leave: {sick_leave}</p>
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
