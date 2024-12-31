import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';
import CompanyManagement from '../components/Admin/CompanyManagement';
import CommunicationMethodManagement from '../components/Admin/CommunicationMethodManagement';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar showLogout={true} />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ padding: '20px', flex: 1 }}>
          <Routes>
            {/* Default route redirects to company-management */}
            <Route path="/" element={<Navigate to="company-management" replace />} />
            <Route path="company-management" element={<CompanyManagement />} />
            <Route path="communication-methods" element={<CommunicationMethodManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


