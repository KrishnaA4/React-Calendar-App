import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditCompanyModal = ({ company, onSave, onClose }) => {
  if (!company) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
        <h3 className="text-xl font-bold mb-4">Edit Company</h3>
        <Formik
          initialValues={company}
          validationSchema={Yup.object({
            name: Yup.string().required('Company name is required'),
            location: Yup.string().required('Location is required'),
            emails: Yup.string().email('Invalid email').required('Email is required'),
          })}
          onSubmit={(values) => {
            onSave(values);
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Company Name</label>
                <Field
                  name="name"
                  placeholder="Company Name"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <Field
                  name="location"
                  placeholder="Location"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium">Emails</label>
                <Field
                  name="emails"
                  placeholder="Emails"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <ErrorMessage name="emails" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex space-x-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default EditCompanyModal;
