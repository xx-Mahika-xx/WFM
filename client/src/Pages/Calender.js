import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Papa from "papaparse"; // CSV parsing library
import Data from "../data.csv";

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const ReactBigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [workTimings, setWorkTimings] = useState("");
  const [selectedWorkTimings, setSelectedWorkTimings] = useState("");

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
    setWorkTimings(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Preferred Work Timings</h2>
        <div className="flex items-center mb-4">
          <label htmlFor="workTimings" className="mr-4 font-semibold">
            Select preferred timings:
          </label>
          <select
            id="workTimings"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
            value={selectedWorkTimings}
            onChange={handleWorkTimingsChange}
          >
            <option value="">Select</option>
            <option value="Morning">00:00 - 04:00</option>
            <option value="Morning">04:00 - 08:00</option>
            <option value="Morning">08:00 - 12:00</option>
            <option value="Morning">12:00 - 16:00</option>
            <option value="Morning">16:00 - 20:00</option>
            <option value="Morning">20:00 - 00:00</option>
          </select>
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
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
