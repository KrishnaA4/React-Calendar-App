import React, { useState } from 'react';

const CommunicationActionModal = ({ companies, onClose, onSubmit }) => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationType, setCommunicationType] = useState('');
  const [communicationDate, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleCompanySelection = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSubmit = () => {
    if (!selectedCompanies.length || !communicationType || !communicationDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const newCommunication = {
      selectedCompanies,
      type: communicationType,
      date: communicationDate,
      notes,
    };

    onSubmit(newCommunication); // Call parent handler with the new communication data
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Log New Communication</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Companies:</label>
          <div className="space-y-2 max-h-40 overflow-y-auto border rounded px-3 py-2">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`company-${company.id}`}
                  className="mr-2"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleCompanySelection(company.id)}
                />
                <label htmlFor={`company-${company.id}`} className="text-sm">
                  {company.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Communication Type:</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={communicationType}
            onChange={(e) => setCommunicationType(e.target.value)}
          >
            <option value="">-- Select Type --</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Date of Communication:</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={communicationDate}
            onChange={(e) => setCommunicationDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Notes:</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationActionModal;
