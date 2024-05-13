import React from "react";
import { useRef, useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, getElementsAtEvent } from "react-chartjs-2";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);

  const [pieChartData, setPieChartData] = useState({
    currentStaffing: 1,
    staffingGaps: 1,
  });

  useEffect(() => {
    // Fetch pie chart data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get("your-backend-endpoint");
        const data = response.data;
        setPieChartData(data);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchData(); // Fetch data initially

    // Update data every minute
    const interval = setInterval(() => {
      fetchData();
      setCurrentTime(getCurrentTime()); // Update current time
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Function to get current time
  function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
  }

  // Function to update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const CurrentData = {
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [pieChartData.currentStaffing, pieChartData.staffingGaps],
        borderColor: "black",
        backgroundColor: ["#F7A76C", "#EC7272"],
      },
    ],
  };

  const UpcomingData = {
    labels: ["Upcoming Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [pieChartData.currentStaffing, pieChartData.staffingGaps],
        borderColor: "black",
        backgroundColor: ["#C3FF99", "#EC7272"],
      },
    ],
  };

  // Function to get the appropriate data and color scheme based on current time
  function getCurrentChartData(low, high) {
    if (currentTime >= low && currentTime < high) {
      return CurrentData;
    } else {
      return UpcomingData;
    }
  }

  const options = {};

  const chartRef1 = useRef();
  const chartRef = useRef();

  const onClick = (event) => {};

  const onClickChart1 = (event) => {
    if (getElementsAtEvent(chartRef1.current, event).length > 0) {
      const datasetIndexNum = getElementsAtEvent(chartRef1.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementsAtEvent(chartRef1.current, event)[0].index;
      console.log(`Dataset: ${datasetIndexNum} and Data: ${dataPoint}`);
      console.log(CurrentData.datasets[datasetIndexNum].data[dataPoint]);
      setOpen(true);
    }
  };

  const [department, setDepartment] = useState("Surgery"); // State to track the selected department
  const [unitOptions, setUnitOptions] = useState([
    "General Surgery Unit",
    "Orthopedic Surgery Unit",
    "Cardiothoracic Surgery Unit",
    "Neurosurgery Unit",
    "Plastic and Reconstructive Surgery Unit",
  ]); // State to store options for the second dropdown

  // Function to handle change in the first dropdown
  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);

    // Update the options for the second dropdown based on the selected department
    // Example: You can fetch options from an API based on the selected department
    if (selectedDepartment === "Surgery") {
      setUnitOptions([
        "General Surgery Unit",
        "Orthopedic Surgery Unit",
        "Cardiothoracic Surgery Unit",
        "Neurosurgery Unit",
        "Plastic and Reconstructive Surgery Unit",
      ]);
    } else if (selectedDepartment === "Pediatrics") {
      setUnitOptions([
        "Neonatal Intensive Care Unit (NICU)",
        "Pediatric Oncology Unit",
        "Pediatric Cardiology Unit",
        "Pediatric Neurology Unit",
        "Pediatric Pulmonology Unit",
      ]);
    } else if (selectedDepartment === "Obstetrics and Gynecology") {
      setUnitOptions([
        "Labor and Delivery Unit",
        "High-Risk Obstetrics Unit",
        "Gynecologic Oncology Unit",
        "Reproductive Endocrinology and Infertility Unit",
        "Maternal-Fetal Medicine Unit",
      ]);
    } else if (selectedDepartment === "Emergency Medicine") {
      setUnitOptions([
        "Trauma Unit",
        "Critical Care Unit",
        "Pediatric Emergency Unit",
        "Chest Pain Unit",
        "Stroke Unit",
      ]);
    } else if (selectedDepartment === "Internal Medicine") {
      setUnitOptions([
        "Cardiology Unit",
        "Gastroenterology Unit",
        "Pulmonology Unit",
        "Nephrology Unit",
        "Endocrinology Unit",
      ]);
    }
      else if (selectedDepartment === "General") {
        setUnitOptions([
          "A",
          "B",
        ]);
    }
  };

  // State variable to store selected employees
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Function to handle employee selection/deselection
  const handleEmployeeSelect = (selectedList, selectedItem) => {
    setSelectedEmployees(selectedList);
  };

  // Function to handle confirm button click
  const handleConfirmClick = async () => {
    try {
      // Send selected employee data to the backend
      await axios.post("your-backend-endpoint", {
        employees: selectedEmployees,
      });
      // Close the modal after successful submission
      onCloseModal();
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      {/* Common header */}
      <div
        className="text-center font-bold text-3xl p-4 mb-4"
        style={{ color: "#000" }}
      >
        Dashboard
      </div>

      {/* Dropdowns */}
      <div className="flex justify-center flex-col md:flex-row items-center mb-4 md:mb-8">
        <div className="mr-0 md:mr-4 mb-4 md:mb-0">
          {/* First dropdown */}
          <select
            className="p-2 rounded-md shadow-lg w-full md:w-auto"
            value={department}
            onChange={handleDepartmentChange}
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            <option value="Surgery">Surgery</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Obstetrics and Gynecology">
              Obstetrics and Gynecology
            </option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="General">General</option>
          </select>
        </div>
        <div>
          {/* Second dropdown */}
          <select
            className="p-2 rounded-md shadow-lg w-full md:w-auto"
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            {unitOptions.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive divs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {/* Placeholder content */}
        <div
          className="max-h-96 w-full p-4 rounded-md flex flex-col justify-center items-center"
          style={{ boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.3)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#000" }}>
            Timings: 00:00 - 04:00
          </h3>
          <Pie
            style={{ maxHeight: "96%" }}
            data={getCurrentChartData(0, 4)}
            options={options}
            onClick={onClickChart1}
            ref={chartRef1}
          />
        </div>
        <div
          className="max-h-96 w-full p-4 rounded-md flex flex-col justify-center items-center"
          style={{ boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.3)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#000" }}>
            Timings: 04:00 - 08:00
          </h3>
          <Pie
            style={{ maxHeight: "96%" }}
            data={getCurrentChartData(4, 8)}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div
          className="max-h-96 w-full p-4 rounded-md flex flex-col justify-center items-center"
          style={{ boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.3)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#000" }}>
            Timings: 08:00 - 12:00
          </h3>
          <Pie
            style={{ maxHeight: "96%" }}
            data={getCurrentChartData(8, 12)}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div
          className="max-h-96 w-full p-4 rounded-md flex flex-col justify-center items-center"
          style={{ boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.3)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#000" }}>
            Timings: 12:00 - 16:00
          </h3>
          <Pie
            style={{ maxHeight: "96%" }}
            data={getCurrentChartData(12, 16)}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div
          className="max-h-96 w-full p-4 rounded-md flex flex-col justify-center items-center"
          style={{ boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.3)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#000" }}>
            Timings: 16:00 - 20:00
          </h3>
          <Pie
            style={{ maxHeight: "96%" }}
            data={getCurrentChartData(16, 20)}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <div
          className="max-h-96 w-full p-4 rounded-md flex flex-col justify-center items-center"
          style={{ boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.3)" }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#000" }}>
            Timings: 20:00 - 00:00
          </h3>
          <Pie
            style={{ maxHeight: "96%" }}
            data={getCurrentChartData(20, 24)}
            options={options}
            onClick={onClick}
            ref={chartRef}
          />
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Job Scheduling
            </h2>
            <div
              className="flex items-center mb-4"
              style={{ minHeight: "200px" }}
            >
              <label className="pr-4 text-right mr-2">Employee:</label>
              <Multiselect
                style={{
                  chips: {
                    background: "#A1E3D8",
                  },
                  multiselectContainer: {
                    color: "#A1E3D8",
                  },
                  searchBox: {
                    border: "none",
                    "border-bottom": "1px solid blue",
                    "border-radius": "0px",
                  },
                }}
                isObject={false}
                onKeyPressFn={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={handleEmployeeSelect}
                onRemove={handleEmployeeSelect}
                options={[
                  "Option 1",
                  "Option 2",
                  "Option 3",
                  "Option 4",
                  "Option 5",
                ]}
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleConfirmClick}
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