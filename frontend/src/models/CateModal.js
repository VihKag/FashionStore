// import { useEffect, useState } from "react";

import { useState } from "react";

const CateModal = ({ categoryValue }) => {
    const [formData, setFormData] = useState({
        id: categoryValue.id,
        category: categoryValue.category,
        parentCategory: categoryValue.parentCategory,
      });
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission, e.g., update the category information.
        // You can send the formData to your API or perform any other necessary action.
        console.log("Form Data:", formData);
        toggleModal(); // Close the modal after submission.
      };
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    return (
      <>
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Edit
        </button>
        {isOpen && (
          <div
            className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center"
            onClick={toggleModal}
          >
            <div
              className="relative bg-white rounded-lg shadow max-w-md p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover-bg-gray-200 hover-text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">Edit your category</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">
                      ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      id="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-blue-500 focus-border-blue-500 block w-72 p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-blue-500 focus-border-blue-500 block w-72 p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="parentCategory" className="block mb-2 text-sm font-medium text-gray-900">
                      Parent Category
                    </label>
                    <input
                      type="text"
                      name="parentCategory"
                      id="parentCategory"
                      value={formData.parentCategory}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-blue-500 focus-border-blue-500 block w-72 p-2.5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover-bg-blue-800 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Update Category
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  export default CateModal;
  