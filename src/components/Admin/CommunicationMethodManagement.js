import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const defaultMethods = [
  { id: 1, name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
  { id: 2, name: "LinkedIn Message", description: "Direct LinkedIn Message", sequence: 2, mandatory: true },
  { id: 3, name: "Email", description: "Send an email", sequence: 3, mandatory: false },
  { id: 4, name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
  { id: 5, name: "Other", description: "Any other form of communication", sequence: 5, mandatory: false },
];

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState(defaultMethods);

  const handleAddMethod = (values) => {
    const newMethod = { id: methods.length + 1, ...values };
    setMethods([...methods, newMethod]);
  };

  const handleDeleteMethod = (id) => {
    setMethods(methods.filter((method) => method.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Communication Method Management</h2>
      {/* Add Communication Method Form */}
      <Formik
        initialValues={{
          name: '',
          description: '',
          sequence: '',
          mandatory: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          description: Yup.string().required('Description is required'),
          sequence: Yup.number().required('Sequence is required').positive().integer(),
        })}
        onSubmit={(values, { resetForm }) => {
          handleAddMethod(values);
          resetForm();
        }}
      >
        {() => (
          <Form className="bg-white shadow-md rounded-md p-6 space-y-4">
            <div>
              <Field
                name="name"
                placeholder="Method Name"
                className="w-full border px-3 py-2 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="description"
                placeholder="Description"
                className="w-full border px-3 py-2 rounded-md"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                name="sequence"
                placeholder="Sequence (Number)"
                type="number"
                className="w-full border px-3 py-2 rounded-md"
              />
              <ErrorMessage name="sequence" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex items-center space-x-2">
              <Field name="mandatory" type="checkbox" className="h-4 w-4" />
              <label className="text-sm">Mandatory</label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add Method
            </button>
          </Form>
        )}
      </Formik>

      {/* Communication Methods List */}
      <h3 className="text-xl font-semibold">Methods List</h3>
      <ul className="space-y-4">
        {methods.map((method) => (
          <li
            key={method.id}
            className="bg-white shadow-md border rounded-md p-4 flex justify-between items-center"
          >
            <div>
              <strong className="block font-bold">{method.name}</strong>
              <p className="text-sm text-gray-600">Description: {method.description}</p>
              <p className="text-sm text-gray-600">Sequence: {method.sequence}</p>
              <p className="text-sm text-gray-600">
                Mandatory: {method.mandatory ? 'Yes' : 'No'}
              </p>
            </div>
            <button
              onClick={() => handleDeleteMethod(method.id)}
              className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunicationMethodManagement;


