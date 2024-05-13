import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUsernameFromCookie } from "../utils/userUtil";

const Notification = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    const userName = getUsernameFromCookie();
    axios
      .get("/data/get-leave-data", {
        params :{
          username : userName
        }
      })
      .then((response) => {
        console.log(response.data);
        setApprovals(response.data)})
      .catch((error) => console.error("Error fetching approvals:", error));
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4 text-black">
        Approvals
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr className="text-center font-bold">
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                S.no
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
                Type
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* {approvals.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.endDate}</td>
                <td className="px-6 py-4 whitespace-normal">{item.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification;
