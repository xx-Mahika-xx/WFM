import React from "react";

const Approvals = () => {
  const handleTickClick = () => {
    // Logic for handling tick click
    console.log("Tick clicked");
  };

  const handleCrossClick = () => {
    // Logic for handling cross click
    console.log("Cross clicked");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4 text-white">
        Pending Approvals
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr className="text-center font-bold">
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                S.no
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Unit
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                Reason
              </th>
              {/* Empty table head for tick and cross columns */}
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">Unit A</td>
              <td className="px-6 py-4 whitespace-nowrap">2024-04-30</td>
              <td className="px-6 py-4 whitespace-normal">
                Some reason hereSome reason here Some reason here Some reason
                here Some reason here Some reason here Some reason here Some
                reason here Some reason here Some reason here Some reason here
                Some reason here Some reason here Some reason here Some reason
                here
              </td>
              {/* Tick column */}
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleTickClick()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 hover:text-green-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.293 7.293a1 1 0 011.414 0l5 5a1 1 0 001.414 0l10-10a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              {/* Cross column */}
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleCrossClick()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 hover:text-red-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.414 10l4.293-4.293a1 1 0 00-1.414-1.414L12 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L10.586 10l-4.293 4.293a1 1 0 001.414 1.414L12 11.414l4.293 4.293a1 1 0 001.414-1.414L13.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">Unit A</td>
              <td className="px-6 py-4 whitespace-nowrap">2024-04-30</td>
              <td className="px-6 py-4 whitespace-normal">
                Some reason hereSome reason here Some reason here Some reason
                here Some reason here Some reason here Some reason here Some
                reason here Some reason here Some reason here Some reason here
                Some reason here Some reason here Some reason here Some reason
                here
              </td>
              {/* Tick column */}
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleTickClick()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 hover:text-green-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.293 7.293a1 1 0 011.414 0l5 5a1 1 0 001.414 0l10-10a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              {/* Cross column */}
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleCrossClick()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 hover:text-red-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.414 10l4.293-4.293a1 1 0 00-1.414-1.414L12 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L10.586 10l-4.293 4.293a1 1 0 001.414 1.414L12 11.414l4.293 4.293a1 1 0 001.414-1.414L13.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
