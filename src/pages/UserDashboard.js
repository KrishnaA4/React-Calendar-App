import React, { useState, useEffect } from "react";
import Notifications from "../components/User/Notifications";
import CommunicationActionModal from "../components/User/CommunicationActionModal";
import { useNavigate } from "react-router-dom"; // For navigation
import { FaCalendarAlt } from "react-icons/fa"; // Calendar Icon

const initialCompanies = [
  {
    id: 1,
    name: "Tech Solutions",
    lastCommunications: [
      { type: "Email", date: "2024-12-20", notes: "Discussed pricing" },
      { type: "Phone Call", date: "2024-12-15", notes: "Followed up on the proposal" },
      { type: "LinkedIn Post", date: "2024-12-10", notes: "Shared case study link" },
      { type: "Email", date: "2024-12-05", notes: "Sent product catalog" },
      { type: "Meeting", date: "2024-11-25", notes: "Quarterly review meeting" },
    ],
    nextCommunication: { type: "Phone Call", date: "2024-12-28" },
  },
  {
    id: 2,
    name: "InnoVentures",
    lastCommunications: [
      { type: "LinkedIn Post", date: "2024-12-22", notes: "Posted a new article" },
      { type: "Email", date: "2024-12-18", notes: "Shared a pricing sheet" },
      { type: "Phone Call", date: "2024-12-12", notes: "Discussed project timeline" },
      { type: "LinkedIn Message", date: "2024-12-05", notes: "Connected with decision-maker" },
      { type: "Meeting", date: "2024-11-30", notes: "Initial discussion" },
    ],
    nextCommunication: { type: "Email", date: "2025-1-15" },
  },
  {
    id: 3,
    name: "Future Corp",
    lastCommunications: [
      { type: "Meeting", date: "2024-12-01", notes: "Discussed future collaborations" },
      { type: "Email", date: "2024-11-25", notes: "Shared a report summary" },
      { type: "Phone Call", date: "2024-11-20", notes: "Followed up on earlier meeting" },
    ],
    nextCommunication: { type: "LinkedIn Message", date: "2024-12-28" },
  },
];

const UserDashboard = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightsDisabled, setHighlightsDisabled] = useState([]);
  const navigate = useNavigate(); // Initialize navigation hook

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const isOverdue = (date) => new Date(date) < new Date(today);
  const isDueToday = (date) => {
    const dueDate = new Date(date);
    const todayDate = new Date(today);
  
    // Set the time of both dates to 00:00:00 for accurate comparison
    dueDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);
  
    return dueDate.getTime() === todayDate.getTime();
  };
  

  const [overdue, setOverdue] = useState(
    initialCompanies.filter((company) => isOverdue(company.nextCommunication?.date))
  );
  const [dueToday, setDueToday] = useState(
    initialCompanies.filter((company) => isDueToday(company.nextCommunication?.date))
  );

  useEffect(() => {
    setOverdue(companies.filter((company) => isOverdue(company.nextCommunication?.date)));
    setDueToday(companies.filter((company) => isDueToday(company.nextCommunication?.date)));
  }, [companies]);

  const handleLogCommunication = (newCommunication) => {
    const { selectedCompanies, type, date, notes } = newCommunication;

    const updatedCompanies = companies.map((company) => {
      if (selectedCompanies.includes(company.id)) {
        const updatedLastCommunications = [
          { type, date, notes },
          ...company.lastCommunications,
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        const isFutureDate = new Date(date) > new Date(today);
        const isTodayDate = date === today;

        return {
          ...company,
          lastCommunications: updatedLastCommunications,
          nextCommunication: isFutureDate || isTodayDate
            ? { type, date }
            : company.nextCommunication,
        };
      }
      return company;
    });

    setCompanies(updatedCompanies);
  };

  const toggleHighlight = (id) => {
    setHighlightsDisabled((prev) =>
      prev.includes(id) ? prev.filter((companyId) => companyId !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    navigate("/"); // Navigate to the home page
  };

  const goToCalendar = () => {
    navigate("/calendar", { state: { companies } }); // Pass companies data when navigating to CalendarView
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Top Bar with Title, Logout Button, and Calendar Icon */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">User Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* Calendar Icon */}
          <button
            onClick={goToCalendar}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
            title="Go to Calendar View"
          >
            <FaCalendarAlt className="w-5 h-5" />
          </button>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <Notifications overdue={overdue} dueToday={dueToday} />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Log Communication
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Company Name</th>
            <th className="py-3 px-4 text-left">Last Five Communications</th>
            <th className="py-3 px-4 text-left">Next Scheduled Communication</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            const { id, name, lastCommunications, nextCommunication } = company;

            const highlightClass = highlightsDisabled.includes(id)
              ? ""
              : isOverdue(nextCommunication?.date)
              ? "bg-red-100"
              : isDueToday(nextCommunication?.date)
              ? "bg-yellow-100"
              : "";

            return (
              <tr
                key={id}
                className={`${highlightClass} border-b border-gray-200 hover:bg-gray-50`}
              >
                <td className="py-3 px-4">{name}</td>
                <td className="py-3 px-4 space-y-2">
                  {lastCommunications.map((comm, index) => (
                    <div
                      key={index}
                      className="text-sm"
                      data-tooltip-id={`tooltip-${id}-${index}`}
                      data-tooltip-content={comm.notes}
                    >
                      {comm.type} - {new Date(comm.date).toLocaleDateString()}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4">
                  {nextCommunication
                    ? `${nextCommunication.type} - ${new Date(nextCommunication.date).toLocaleDateString()}`
                    : "None"}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleHighlight(id)}
                    className="bg-gray-200 text-sm px-3 py-1 rounded-lg hover:bg-gray-300"
                  >
                    {highlightsDisabled.includes(id) ? "Enable" : "Disable"} Highlight
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpen && (
        <CommunicationActionModal
          companies={companies}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleLogCommunication}
        />
      )}
    </div>
  );
};

export default UserDashboard;
