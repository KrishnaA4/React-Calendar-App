import React from "react";

const Notifications = ({ overdue, dueToday }) => {
  const overdueCount = overdue.length;
  const dueTodayCount = dueToday.length;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Notifications
        <span className="ml-4 bg-red-500 text-white rounded-full px-3 py-1 text-sm">
          {overdueCount + dueTodayCount}
        </span>
      </h2>

      <div className="space-y-6">
        {/* Overdue Communications */}
        <div>
          <h3 className="text-lg font-semibold text-red-600">
            Overdue Communications ({overdueCount})
          </h3>
          {overdueCount > 0 ? (
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {overdue.map((company) => (
                <li key={company.id} className="text-gray-700">
                  {company.name} - {company.nextCommunication?.type || "Unknown"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No overdue communications.</p>
          )}
        </div>

        {/* Today's Communications */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-600">
            Due Today ({dueTodayCount})
          </h3>
          {dueTodayCount > 0 ? (
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {dueToday.map((company) => (
                <li key={company.id} className="text-gray-700">
                  {company.name} - {company.nextCommunication?.type || "Unknown"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No communications due today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
