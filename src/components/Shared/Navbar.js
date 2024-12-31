import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ showLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f8f9fa',
      }}
    >
      {/* Admin Dashboard with Bold Styling */}
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Admin Dashboard</div>
      {showLogout && (
        <button
          onClick={handleLogout}
          style={{
            cursor: 'pointer',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
