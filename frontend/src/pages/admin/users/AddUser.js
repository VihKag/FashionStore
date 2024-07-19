import React, { useState } from "react";
import Header from "../../../components/header/HeaderAdmin";

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    website: "",
    password: "",
    sendNotification: true,
    role: "Subscriber",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, sendNotification: !formData.sendNotification });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <div className="top-0 sticky z-50">
        <Header />
      </div>

      <div className="bg-gray-100 rounded-md shadow-md p-8">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-1">
              Username (required)
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email (required)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-400 p-2 rounded-md"
            />
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-800 ml-2"
            >
              Show password
            </button>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="sendNotification"
              name="sendNotification"
              checked={formData.sendNotification}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="sendNotification" className="font-semibold">
              Send the new user an email about their account.
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block font-semibold mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-400 p-2 rounded-md"
            >
              <option value="Subscriber">Subscriber</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add New User
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
