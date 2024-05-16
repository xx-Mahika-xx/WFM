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
  const [optionsEmployee, setOptionsEmployee] = useState([]);

  const [pieData1, setPieData1] = useState({
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [1, 1],
        borderColor: "black",
        backgroundColor: ["#F7A76C", "#EC7272"],
      },
    ],
  });

  const [pieData2, setPieData2] = useState({
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [1, 1],
        borderColor: "black",
        backgroundColor: ["#F7A76C", "#EC7272"],
      },
    ],
  });

  const [pieData3, setPieData3] = useState({
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [1, 1],
        borderColor: "black",
        backgroundColor: ["#F7A76C", "#EC7272"],
      },
    ],
  });

  const [pieData4, setPieData4] = useState({
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [1, 1],
        borderColor: "black",
        backgroundColor: ["#F7A76C", "#EC7272"],
      },
    ],
  });

  const [pieData5, setPieData5] = useState({
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [1, 1],
        borderColor: "black",
        backgroundColor: ["#F7A76C", "#EC7272"],
      },
    ],
  });

  const [pieData6, setPieData6] = useState({
    labels: ["Current Staffing", "Staffing Gaps"],
    datasets: [
      {
        label: "Staffing",
        data: [1, 1],
        borderColor: "black",
        backgroundColor: ["#F7A76C", "#EC7272"],
      },
    ],
  });

  let staffReq1, staffReq2, staffReq3, staffReq4, staffReq5, staffReq6;

  useEffect(() => {
    fetchOptions(); // Call fetchOptions function when component mounts
    // Update data every minute
    fetchData("Surgery", "General Surgery Unit");
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime()); // Update current time
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const fetchOptions = async (department, slot) => {
    try {
      const encodedDate = "2024-04-25T00:00:00.000+00:00";
      console.log("Department: ", department, " Slot: ", slot);
      const date = new Date(); // Get the current date and time
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}T00:00:00.000+00:00`;

      const response = await axios.get("/data/get-available-employees", {
        params: {
          date: encodedDate,
          department: department,
          slot: slot,
        },
      });
      console.log("Employees Data:", response.data.data);
      const Emp = response.data.data;
      let Arr = [];
      Emp.map((item) => {
        Arr.push({ id: item.employeeId, username: item.username });
      });

      console.log("Arr:", Arr);

      setOptionsEmployee(Arr); // Update options state with fetched data
      setLoading(false); // Update loading state to indicate options are loaded

    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const fetchData = async (department, unit) => {
    try {
      const encodedDate = "2024-04-27T00:00:00.000+00:00";
      const date = new Date(); // Get the current date and time
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}T00:00:00.000+00:00`;
      const response = await axios.get("/data/getattendance", {
        params: {
          date: encodedDate,
          department: department,
          unit: unit,
        },
      });
      console.log(response.data.data);
      const dataPie = response.data.data;
      let StaffGap = [];
      dataPie.map((item, index) => {
        const currentStaff = item.count;
        const requiredStaff = item.requirement - item.count;
        let low, high;
        // console.log("Current Staff: ",currentStaff," Required Staff: ",requiredStaff);
        if (index === 0) {
          low = 0;
          high = 4;
          staffReq1 = requiredStaff;
        } else if (index === 1) {
          low = 4;
          high = 8;
          staffReq2 = requiredStaff;
        } else if (index === 2) {
          low = 8;
          high = 12;
          staffReq3 = requiredStaff;
        } else if (index === 3) {
          low = 12;
          high = 16;
          staffReq4 = requiredStaff;
        } else if (index === 4) {
          low = 16;
          high = 20;
          staffReq5 = requiredStaff;
        } else if (index === 5) {
          low = 20;
          high = 24;
          staffReq6 = requiredStaff;
        }

        if (currentTime >= low && currentTime < high) {
          let CurrentData = {
            labels: ["Current Staffing", "Staffing Gaps"],
            datasets: [
              {
                label: "Staffing",
                data: [currentStaff, requiredStaff],
                borderColor: "black",
                backgroundColor: ["#F7A76C", "#EC7272"],
              },
            ],
          };
          if (index === 0) {
            setPieData1(CurrentData);
          } else if (index === 1) {
            setPieData2(CurrentData);
          } else if (index === 2) {
            setPieData3(CurrentData);
          } else if (index === 3) {
            setPieData4(CurrentData);
          } else if (index === 4) {
            setPieData5(CurrentData);
          } else if (index === 5) {
            setPieData6(CurrentData);
          }
        } else {
          let UpcomingData = {
            labels: ["Upcoming Staffing", "Staffing Gaps"],
            datasets: [
              {
                label: "Staffing",
                data: [currentStaff, requiredStaff],
                borderColor: "black",
                backgroundColor: ["#C3FF99", "#EC7272"],
              },
            ],
          };
          if (index === 0) {
            setPieData1(UpcomingData);
          } else if (index === 1) {
            setPieData2(UpcomingData);
          } else if (index === 2) {
            setPieData3(UpcomingData);
          } else if (index === 3) {
            setPieData4(UpcomingData);
          } else if (index === 4) {
            setPieData5(UpcomingData);
          } else if (index === 5) {
            setPieData6(UpcomingData);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Function to get current time
  function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
  }

  const [department, setDepartment] = useState("Surgery"); // State to track the selected department
  const [unit, setUnit] = useState("General Surgery Unit");
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
      setUnit("General Surgery Unit");
      fetchData(selectedDepartment, unit);
      setUnitOptions([
        "General Surgery Unit",
        "Orthopedic Surgery Unit",
        "Cardiothoracic Surgery Unit",
        "Neurosurgery Unit",
        "Plastic and Reconstructive Surgery Unit",
      ]);
    } else if (selectedDepartment === "Pediatrics") {
      setUnit("Neonatal Intensive Care Unit (NICU)");
      fetchData(selectedDepartment, unit);
      setUnitOptions([
        "Neonatal Intensive Care Unit (NICU)",
        "Pediatric Oncology Unit",
        "Pediatric Cardiology Unit",
        "Pediatric Neurology Unit",
        "Pediatric Pulmonology Unit",
      ]);
    } else if (selectedDepartment === "Obstetrics and Gynecology") {
      setUnit("Labor and Delivery Unit");
      fetchData(selectedDepartment, unit);
      setUnitOptions([
        "Labor and Delivery Unit",
        "High-Risk Obstetrics Unit",
        "Gynecologic Oncology Unit",
        "Reproductive Endocrinology and Infertility Unit",
        "Maternal-Fetal Medicine Unit",
      ]);
    } else if (selectedDepartment === "Emergency Medicine") {
      setUnit("Trauma Unit");
      fetchData(selectedDepartment, unit);
      setUnitOptions([
        "Trauma Unit",
        "Critical Care Unit",
        "Pediatric Emergency Unit",
        "Chest Pain Unit",
        "Stroke Unit",
      ]);
    } else if (selectedDepartment === "Internal Medicine") {
      setUnit("Cardiology Unit");
      fetchData(selectedDepartment, unit);
      setUnitOptions([
        "Cardiology Unit",
        "Gastroenterology Unit",
        "Pulmonology Unit",
        "Nephrology Unit",
        "Endocrinology Unit",
      ]);
    } else if (selectedDepartment === "General") {
      fetchData(selectedDepartment, "A");
      setUnitOptions(["A", "B"]);
    }
  };

  // State variable to store selected employees
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  // State variable to track loading state
  const [loading, setLoading] = useState(true);

  // Function to handle employee selection/deselection
  const handleEmployeeSelect = (selectedList) => {
      setSelectedEmployees(selectedList);
  };

  // Function to handle confirm button click
  const handleConfirmClick = async () => {
    try {
      console.log("Selected Employees: ", selectedEmployees);

      // Send selected employee data to the backend
      await Promise.all(
        selectedEmployees.map(async (item) => {
          await axios.post("/data/assign-employee", {
            employeeId: item.id, // Assuming each item represents a single employee
          });
        })
      );

      // await axios.post("/data/assign-employee", {
      //   employeeId: selectedEmployees[0].id, // Assuming each item represents a single employee
      // });

      // Close the modal after successful submission
      onCloseModal();
      fetchData(department, unit);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      // Handle error (e.g., display error message)
    }
  };

  const handleUnitChange = (event) => {
    // Access the selected value with event.target.value
    const selectedUnit = event.target.value;
    fetchData(department, selectedUnit);
    // console.log(department,selectedUnit);
  };

  const options = {};

  const chartRef = useRef();

  const onClickChart1 = (event, slot) => {
    if (getElementsAtEvent(chartRef.current, event).length > 0) {
      fetchOptions(department, slot);
      setOpen(true);
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
            onChange={handleUnitChange}
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
            data={pieData1}
            options={options}
            onClick={(event) => onClickChart1(event, 1)}
            ref={chartRef}
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
            data={pieData2}
            options={options}
            onClick={(event) => onClickChart1(event, 2)}
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
            data={pieData3}
            options={options}
            onClick={(event) => onClickChart1(event, 3)}
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
            data={pieData4}
            options={options}
            onClick={(event) => onClickChart1(event, 4)}
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
            data={pieData5}
            options={options}
            onClick={(event) => onClickChart1(event, 5)}
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
            data={pieData6}
            options={options}
            onClick={(event) => onClickChart1(event, 6)}
            ref={chartRef}
          />
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Job Scheduling
            </h2>
            {loading ? ( // Display loading indicator while options are being fetched
              <p>Loading options...</p>
            ) : (
              <div
                className="flex items-center mb-4"
                style={{ minHeight: "200px" }}
              >
                <label className="pr-4 text-right mr-2">Employee:</label>

                <Multiselect
                  style={{
                    chips: { background: "#A1E3D8", color: "black" },
                    multiselectContainer: { color: "#A1E3D8" },
                    searchBox: {
                      border: "none",
                      borderBottom: "1px solid blue",
                      borderRadius: "0px",
                    },
                  }}
                  selectedValues={selectedEmployees}
                  onSelect={handleEmployeeSelect}
                  onRemove={handleEmployeeSelect}
                  options={optionsEmployee} // Pass options fetched from backend
                  displayValue="username"
                />
              </div>
            )}
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={onCloseModal}
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
