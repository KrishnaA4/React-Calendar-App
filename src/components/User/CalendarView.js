import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

// Helper function to get all days in a month
const getDaysInMonth = (date) => {
  const days = [];
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    const currentDay = new Date(date.getFullYear(), date.getMonth(), i);
    days.push(currentDay);
  }
  return days;
};

const CalendarView = () => {
  const location = useLocation(); // Access location object
  const navigate = useNavigate(); // Initialize navigation hook
  const companies = location.state?.companies || [];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Real-time system date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Update the days when currentDate changes
  useEffect(() => {
    const days = getDaysInMonth(currentDate);
    setDaysInMonth(days);
  }, [currentDate]);

  // Get communications for a specific day
  const getCommunicationsForDay = (day) => {
    const communications = [];
    const dayAtMidnight = new Date(day).setHours(0, 0, 0, 0); // Normalize the day to midnight

    companies.forEach((company) => {
      // Check if 'lastCommunications' exists and is an array
      if (Array.isArray(company.lastCommunications)) {
        company.lastCommunications.forEach((comm) => {
          const commDate = new Date(comm.date).setHours(0, 0, 0, 0); // Normalize communication date

          if (commDate === dayAtMidnight) {
            communications.push({
              companyName: company.name,
              type: comm.type,
              date: comm.date,
              notes: comm.notes || "",
              isPast: commDate < today,
              isToday: commDate === today,
            });
          }
        });
      }

      // Ensure 'nextCommunication' exists and has a valid date
      if (company.nextCommunication && company.nextCommunication.date) {
        const nextCommDate = new Date(company.nextCommunication.date).setHours(0, 0, 0, 0); // Normalize next communication date

        if (nextCommDate === dayAtMidnight) {
          const alreadyExists = communications.some(
            (comm) => comm.date === company.nextCommunication.date && comm.companyName === company.name
          );
          if (!alreadyExists) {
            communications.push({
              companyName: company.name,
              type: company.nextCommunication.type,
              date: company.nextCommunication.date,
              notes: "",
              isPast: nextCommDate < today,
              isToday: nextCommDate === today,
            });
          }
        }
      }
    });

    return communications;
  };

  // Render a single day's communications and style accordingly
  const renderDay = (day) => {
    const communications = getCommunicationsForDay(day);

    const isSameDay = (date1, date2) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const getBgColor = () => {
      if (communications.length > 0) {
        if (isSameDay(day, today)) {
          return "bg-yellow-300"; // Today's communications
        } else if (day < today) {
          return "bg-red-500"; // Past communications
        } else if (day > today) {
          return "bg-green-500"; // Future communications
        }
      }
      return ""; // No communications, no color
    };

    return (
      <div
        key={day}
        className={`p-4 m-1 border rounded-lg cursor-pointer ${getBgColor()}`}
        onClick={() => communications.length > 0 && setSelectedDate(day)} // Allow selection only for days with communications
      >
        <div className="text-sm font-semibold">{day.getDate()}</div>
        {communications.map((comm, index) => (
          <div key={index} className="text-xs mt-1 text-white">
            <strong>{comm.companyName}:</strong> {comm.type}
          </div>
        ))}
      </div>
    );
  };

  // Month navigation buttons
  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Handle back button click
  const handleBack = () => {
    navigate("/user"); // Navigates back to UserDashboard
  };

  return (
    <div className="p-6 bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-700"
        >
          Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Calendar View</h2>

        {/* Color Info Legend */}
        <div className="bg-gray-100 p-4 mb-6 rounded-lg shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Past Interactions</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-300 rounded-full mr-2"></div>
            <span className="text-sm">Present Interactions</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Future Interactions</span>
          </div>
        </div>

        {/* Month navigation */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-lg bg-blue-600 text-white py-2 px-4 rounded"
          >
            Previous Month
          </button>
          <span className="text-lg">{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</span>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-lg bg-blue-600 text-white py-2 px-4 rounded"
          >
            Next Month
          </button>
        </div>

        {/* Calendar grid */}
        <div
          className="grid grid-cols-7 gap-2"
          style={{
            gridTemplateRows: "repeat(5, 1fr)", // Ensure 5 rows for the calendar
          }}
        >
          {daysInMonth.map((day) => renderDay(day))}
        </div>

        {/* Communications for selected date */}
        {selectedDate && (
          <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-center">
              Communications for {selectedDate.toLocaleDateString()}
            </h3>
            <ul className="mt-2">
              {getCommunicationsForDay(selectedDate).map((comm, index) => (
                <li key={index} className="text-sm mt-2">
                  <strong>{comm.companyName}:</strong> {comm.type} - {comm.notes || "No Notes"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
