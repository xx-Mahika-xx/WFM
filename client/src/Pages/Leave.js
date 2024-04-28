import React, { useState } from "react";

const Leave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [casualLeave, setCasualLeave] = useState(5);
  const [paidLeave, setPaidLeave] = useState(10);
  const [sickLeave, setSickLeave] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, such as sending the data to a server or performing validation
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    console.log("Reason:", reason);
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
