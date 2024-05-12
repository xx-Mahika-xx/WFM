import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Papa from "papaparse"; // CSV parsing library
import Data from "../data.csv";
import axios from "axios";

import "react-big-calendar/lib/css/react-big-calendar.css";
axios.defaults.baseURL = 'http://localhost:8080';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

function getUsernameFromCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if the cookie starts with 'username='
      if (cookie.startsWith('username=')) {
          // Extract the value after '='
          return cookie.substring('username='.length, cookie.length);
      }
  }
  // Return null if 'username' cookie is not found
  return null;
}

const ReactBigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedWorkTimings, setSelectedWorkTimings] = useState("");
  const [selectedWorkTimingsDate, setSelectedWorkTimingsDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Data); // Path to your CSV file
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csvData = decoder.decode(result.value);
        const parsedData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
        }).data;

        const formattedEvents = parsedData.map((event) => {
          // Extract hour, minute, and second components from the startTime and endTime strings
          const [startD, startT] = event.startTime.split("T");
          const startDateParts = startD.split("-");
          const startYear = parseInt(startDateParts[0], 10);
          const startMonth = parseInt(startDateParts[1], 10) - 1; // Adjusting month to be zero-based
          const startDay = parseInt(startDateParts[2], 10);

          const startTimeParts = startT.split(":");
          const startHour = parseInt(startTimeParts[0], 10);
          const startMinute = parseInt(startTimeParts[1], 10);

          const [endD, endT] = event.endTime.split("T");
          const endDateParts = endD.split("-");
          const endYear = parseInt(endDateParts[0], 10);
          const endMonth = parseInt(endDateParts[1], 10) - 1; // Adjusting month to be zero-based
          const endDay = parseInt(endDateParts[2], 10);

          const endTimeParts = endT.split(":");
          const endHour = parseInt(endTimeParts[0], 10);
          const endMinute = parseInt(endTimeParts[1], 10);

          // Create Date objects for start and end times
          const startDate = new Date(
            startYear,
            startMonth,
            startDay,
            startHour,
            startMinute,
            0
          );
          const endDate = new Date(
            endYear,
            endMonth,
            endDay,
            endHour,
            endMinute,
            0
          );

          return {
            ...event,
            start: startDate,
            end: endDate,
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleWorkTimingsChange = (e) => {
    setSelectedWorkTimings(e.target.value);
  };

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
    const username = getUsernameFromCookie();
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
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  // //Api for sending data of only timings
  // const handleUpdateWorkTimings = () => {
  //   axios
  //     .post("your-backend-endpoint", selectedWorkTimings)
  //     .then((response) => {
  //       // Handle response from the backend if needed
  //       console.log("Data sent successfully:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending data:", error);
  //     });
  // };

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
              <option value="6">20:00 - 00:00</option>
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
