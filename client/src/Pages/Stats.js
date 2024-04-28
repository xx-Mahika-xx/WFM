import React from "react";
import { useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const CurrentData = {
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [9,3],
        borderColor: "black",
        backgroundColor: ["purple", "aqua"],
      },
    ],
  };

  const UpcomingData = {
    labels: ["Upcoming Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [6, 9],
        borderColor: "black",
        backgroundColor: ["red", "aqua"],
      },
    ],
  };

  const options = {};

  const chartRef = useRef();
  const onClick = (event) => {
    setOpen(true);
  };

  return (
    <div className="">
      {/* Common header */}
      <div className="text-center text-white font-bold text-3xl p-4 mb-4">
        Dashboard
      </div>

      {/* Dropdowns */}
      <div className="flex justify-center mb-4">
        <div className="mr-4">
          {/* First dropdown */}
          <select className="p-2 bg-gray-200 rounded-md">
            <option>Department</option>
            <option>Surgery</option>
            <option>Pediatrics</option>
            <option>Obstetrics and Gynecology</option>
            <option>Emergency Medicine</option>
            <option>Internal Medicine</option>
          </select>
        </div>
        <div>
          {/* Second dropdown */}
          <select className="p-2 bg-gray-200 rounded-md">
            <option>Unit - Will change according to department</option>
            <option>Option A</option>
            <option>Option B</option>
          </select>
        </div>
      </div>

      {/* Responsive divs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {/* Placeholder content */}
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-2">Timings: 00:00 - 04:00</h3>
          <Pie
            data={CurrentData}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-2">Timings: 04:00 - 08:00</h3>
          <Pie
            data={UpcomingData}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-2">Timings: 08:00 - 12:00</h3>
          <Pie
            data={UpcomingData}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-2">Timings: 12:00 - 16:00</h3>
          <Pie
            data={UpcomingData}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-2">Timings: 16:00 - 20:00</h3>
          <Pie
            data={UpcomingData}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold mb-2">Timings: 20:00 - 00:00</h3>
          <Pie
            data={UpcomingData}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Job Scheduling</h2>
            <div className="flex items-center mb-4">
              <label className="w-1/3 pr-4">Employee:</label>
              <select className="w-2/3 border rounded p-2">
                <option value="employee1">Employee 1</option>
                <option value="employee2">Employee 2</option>
                {/* Add more employee options as needed */}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  // Handle confirm button click
                }}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  // Handle cancel button click
                  onCloseModal(); // Close the modal when Cancel is clicked
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Stats;
