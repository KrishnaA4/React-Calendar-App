import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-6">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/admin/company-management"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md hover:bg-blue-200 ${
                isActive ? 'bg-blue-300 font-bold' : ''
              }`
            }
          >
            Company Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/communication-methods"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-md hover:bg-blue-200 ${
                isActive ? 'bg-blue-300 font-bold' : ''
              }`
            }
          >
            Communication Methods
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;









