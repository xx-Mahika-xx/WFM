import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../utils/config";
axios.defaults.baseURL = backendUrl;

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // fetchApprovals();
    axios
      .get("/data/get-leave-data")
      .then((response) => {
        let dataArr = [];
        response.data.data.map((item) => {
          dataArr.push({
            name: item.name,
            department: item.department,
            startDate: new Date(item.startDate).toDateString(),
            endDate: new Date(item.endDate).toDateString(),
            reason: item.reason,
            leaveType: item.leaveType,
          });
        });
        setApprovals(dataArr);
      })
      .catch((error) => console.error("Error fetching approvals:", error));
  }, []);

  const fetchApprovals = () => {};

  const handleTickClick = (id) => {
    // Send the response to the backend
    axios
      .post("your-api-endpoint", { id, response: "approved" })
      .then(() => {
        // Update the approvals list in the frontend by removing the approved entry
        setApprovals(approvals.filter((approval) => approval.id !== id));
      })
      .catch((error) => console.error("Error updating approval:", error));
  };

  const handleCrossClick = (id) => {
    // Send the response to the backend
    axios
      .post("your-api-endpoint", { id, response: "rejected" })
      .then(() => {
        // Update the approvals list in the frontend by removing the rejected entry
        setApprovals(approvals.filter((approval) => approval.id !== id));
      })
      .catch((error) => console.error("Error updating approval:", error));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">Pending Approvals</h1>
      <div className="overflow-x-auto rounded-md shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-center font-bold">
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                S.no
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Department
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Start Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                End Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Reason
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Leave Type
              </th>
              <th
                colSpan="2"
                className="px-6 py-3 border-b border-gray-200 bg-gray-50"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {approvals.map((approval, index) => (
              <tr key={approval.id} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{approval.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {approval.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {approval.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {approval.endDate}
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  {approval.reason}
                </td>
                <td className="px-6 py-4 whitespace-normal">
                  {approval.leaveType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleTickClick(approval.id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.293 7.293a1 1 0 011.414 0l5 5a1 1 0 001.414 0l10-10a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleCrossClick(approval.id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.414 10l4.293-4.293a1 1 0 00-1.414-1.414L12 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L10.586 10l-4.293 4.293a1 1 0 001.414 1.414L12 11.414l4.293 4.293a1 1 0 001.414-1.414L13.414 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
