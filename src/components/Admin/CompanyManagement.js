import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import mockCompanies from '../../mock/companyData';
import EditCompanyModal from './EditCompanyModal';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAddCompany = (values) => {
    const newCompany = { id: Date.now(), ...values }; // Unique ID based on timestamp
    setCompanies((prevCompanies) => {
      const updatedCompanies = [...prevCompanies, newCompany];
      console.log('Companies updated:', updatedCompanies);
      return updatedCompanies;
    });
  };

  const handleSaveCompany = (updatedCompany) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((comp) =>
        comp.id === updatedCompany.id ? updatedCompany : comp
      )
    );
    setEditingCompany(null);
  };

  const handleDeleteCompany = (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== companyId)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Company Management</h2>

      {/* Add Company Form */}
      <Formik
        initialValues={{
          name: '',
          location: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Company name is required'),
          location: Yup.string().required('Location is required'),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log('Form submitted with values:', values);
          handleAddCompany(values);
          resetForm(); // Reset the form after submission
        }}
      >
        {() => (
          <Form className="bg-white shadow-md rounded-md p-6 space-y-4">
            <div>
              <Field
                name="name"
                placeholder="Company Name"
                className="w-full border px-3 py-2 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="location"
                placeholder="Location"
                className="w-full border px-3 py-2 rounded-md"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add Company
            </button>
          </Form>
        )}
      </Formik>

      {/* Companies List */}
      <h3 className="text-xl font-semibold">Companies List</h3>
      <ul className="space-y-4">
        {companies.map((company) => (
          <li
            key={company.id}
            className="bg-white shadow-md border rounded-md p-4 flex justify-between items-center"
          >
            <div>
              <strong className="block font-bold">{company.name}</strong>
              <p className="text-sm text-gray-600">Location: {company.location}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingCompany(company)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCompany(company.id)}
                className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Company Modal */}
      {editingCompany && (
        <EditCompanyModal
          company={editingCompany}
          onSave={handleSaveCompany}
          onClose={() => setEditingCompany(null)}
        />
      )}
    </div>
  );
};

export default CompanyManagement;