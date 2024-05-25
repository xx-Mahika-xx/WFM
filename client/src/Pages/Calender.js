import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Papa from "papaparse"; // CSV parsing library
// import Data from "../data.csv";
import { backendUrl } from "../utils/config";
import axios from "axios";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { getUsernameFromCookie } from "../utils/userUtil";
axios.defaults.baseURL = backendUrl;

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const ReactBigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedWorkTimingsDate, setSelectedWorkTimingsDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const username = getUsernameFromCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let calenderData;

        axios
          .get("/data/get-calendar-data-for-employee", {
            params: {
              username: username,
            },
          })
          .then((response) => {
            calenderData = response.data.data;
            // console.log(calenderData);

            const parsedData = Papa.parse(calenderData, {
              header: true,
              skipEmptyLines: true,
            }).data;

            const formattedEvents = parsedData.map((event) => {
              const start = moment(event.startTime, "YYYY-MM-DDTHH:mm");
              const end = moment(event.endTime, "YYYY-MM-DDTHH:mm");
              return {
                ...event,
                start: start.toDate(),
                end: end.toDate(),
              };
            });

            setEvents(formattedEvents);
          })
          .catch((error) => console.error("Error fetching Calendar:", error));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleWorkTimingsChangeDate = (e) => {
    setSelectedWorkTimingsDate(e.target.value);
  };

  // Function to handle change in the start date input
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Function to handle change in the end date input
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  //Api for sending all data
  const sendDataToBackend = () => {
    // Create an object containing all the data

    const slot = selectedWorkTimingsDate;
    const formData = {
      username,
      slot,
      startDate,
      endDate,
    };
    console.log(formData);

    // Send formData to your backend endpoint using Axios
    axios
      .post("/data/add-availability", formData)
      .then((response) => {
        // Handle response from the backend if needed
        console.log("Data sent successfully:", response.data);
        setSelectedWorkTimingsDate("");
        setStartDate("");
        setEndDate("");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  //Api endpoint : /data/get-calender-data-for-employee
  //give username

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
    <div>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Preferred Work Timings</h2>
        {/* Second Row */}
        {/* Row - Select Timings and Dates */}
        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="flex flex-col mr-0 md:mr-8 mb-4 md:mb-0">
            <label htmlFor="workTimings" className="font-semibold mb-2">
              Select preferred timings:
            </label>
            <select
              id="workTimings"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
              value={selectedWorkTimingsDate}
              onChange={handleWorkTimingsChangeDate}
            >
              <option value="">Select</option>
              <option value="1">00:00 - 04:00</option>
              <option value="2">04:00 - 08:00</option>
              <option value="3">08:00 - 12:00</option>
              <option value="4">12:00 - 16:00</option>
              <option value="5">16:00 - 20:00</option>
              <option value="6">20:00 - 23:59</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="startDate" className="font-semibold mb-2">
              Select start date:
            </label>
            <input
              type="date"
              id="startDate"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
              value={startDate}
              onChange={handleStartDateChange}
              min={getTodayDate()}
              // Add necessary state or props for value and onChange
            />
          </div>
          <div className="flex flex-col ml-0 md:ml-8">
            <label htmlFor="endDate" className="font-semibold mb-2">
              Select end date:
            </label>
            <input
              type="date"
              id="endDate"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate || getTodayDate()}
              // Add necessary state or props for value and onChange
            />
          </div>
          <button
            className="ml-0 md:ml-8 mt-4 md:mt-8 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={sendDataToBackend}
          >
            Update
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <Calendar
          views={["day", "agenda", "week"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          style={{ height: "calc(100vh - 12rem)" }}
          onSelectEvent={(event) => alert(event.title)}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
};

export default ReactBigCalendar;
