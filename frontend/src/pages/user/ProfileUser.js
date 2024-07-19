import React, { useState, useEffect, useContext, useRef } from "react";
import defaultAvatar from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";

const ProfileUser = () => {
  const { profile } = useContext(UserContext);
  
  const fileInputRef = useRef(null);

  const [personalDetails, setPersonalDetails] = useState({
    firstName: profile?.data?.firstName || "",
    lastName: profile?.data?.lastName || "",
    phone: profile?.data?.phone || "",
    email: profile?.data?.email || "",
    birthday: profile?.data?.birthday || "",
    gender: profile?.data?.gender || false,
    image: profile?.data?.image || "",
  });

  const [showImageOptions, setShowImageOptions] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (profile && profile.data) {
      setPersonalDetails({
        firstName: profile.data.firstName || "",
        lastName: profile.data.lastName || "",
        phone: profile.data.phone || "",
        email: profile.data.email || "",
        birthday: profile.data.birthday || "",
        gender: profile.data.gender || false,
        image: profile.data.image || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    setShowImageOptions(true);
  };

  const handleImageOptionSelect = (option) => {
    if (option === "upload") {
      fileInputRef.current.click();
    } else if (option === "remove") {
      setPersonalDetails({
        ...personalDetails,
        image: "",
      });
      setPreviewImage(null);
    }
    setShowImageOptions(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    setPersonalDetails({
      ...personalDetails,
      image: previewImage,
    });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(personalDetails);
    // Implement API call to update user data
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col container mx-auto my-16 rounded-lg shadow-md p-8 bg-white">
      <div>
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <img
              src={personalDetails.image || defaultAvatar}
              alt={profile.data.name}
              className="w-32 h-32 rounded-full border border-white shadow-lg cursor-pointer object-contain"
              onClick={handleImageClick}
            />
            {showImageOptions && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 rounded-full">
                <button
                  onClick={() => handleImageOptionSelect("upload")}
                  className="bg-white text-gray-700 p-1 rounded-full mr-2 hover:bg-gray-200 transition duration-200"
                >
                  <FontAwesomeIcon icon={faCamera} size="lg" />
                </button>
                <button
                  onClick={() => handleImageOptionSelect("remove")}
                  className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-200 transition duration-200"
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
              </div>
            )}
            {previewImage && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <div className="relative w-full h-full">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-30">
                      <div className="spinner"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {profile.data.name}
          </h2>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          {previewImage && (
            <div className="flex flex-col items-center mb-6">
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mb-4"
              />
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSaveImage}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-white p-8">
        <h2 className="text-xl font-bold mb-4">Personal Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Rest of the form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-semibold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={personalDetails.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={personalDetails.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={personalDetails.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={personalDetails.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="birthday"
                className="block text-gray-700 font-semibold mb-2"
              >
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={personalDetails.birthday}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-gray-700 font-semibold mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={personalDetails.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value={false}>Female</option>
                <option value={true}>Male</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 duration-300 hover:text-white hover:font-semibold py-2 px-4 rounded-md text-gray-500 hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUser;
