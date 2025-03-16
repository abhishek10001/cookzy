

import React, { useContext, useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTransgender,
  FaBirthdayCake,
  FaEdit,
  FaSave,
  FaCamera,
  FaUser,
  FaIdCard,
} from "react-icons/fa";
import MyBookings from "./MyBookings";
import assets from "../assets/assets_frontend/assets.js";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Reset image when exiting edit mode without saving
    if (!isEdit && image) {
      setImage(null);
    }
  }, [isEdit]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again!");
    }
  };

  const handleInputChange = (field, value, isNestedField = false) => {
    setUserData((prev) => {
      if (isNestedField) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSaveOrEdit = () => {
    if (isEdit) {
      updateUserProfileData();
    } else {
      setIsEdit(true);
    }
  };

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5200]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 h-48">
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                  {isEdit ? (
                    <>
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : userData.image || assets.default_avatar
                        }
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                      <label
                        htmlFor="image-upload"
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <FaCamera className="text-white text-2xl" />
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </>
                  ) : (
                    <img
                      src={userData.image || assets.default_avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-8">
              <button
                onClick={handleSaveOrEdit}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white transition duration-300 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : isEdit
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-[#FF5200] hover:bg-orange-600"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></div>
                    <span>Loading...</span>
                  </div>
                ) : isEdit ? (
                  <>
                    <FaSave />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <FaEdit />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* User Name - appears below the profile image */}
          <div className="mt-16 pt-2 px-8">
            <div className="flex items-center space-x-2">
              <FaUser className="text-[#FF5200]" />
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-2xl font-bold text-gray-800 border-b-2 border-[#FF5200] focus:outline-none"
                  placeholder="Your Name"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-800">
                  {userData.name || "User"}
                </h1>
              )}
            </div>
            <div className="text-sm text-gray-500 ml-6">{userData.email}</div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mt-6 px-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-[#FF5200] text-[#FF5200]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-3 px-4 border-b-2 font-medium text-sm ${
                activeTab === "bookings"
                  ? "border-[#FF5200] text-[#FF5200]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Bookings
            </button>
          </div>

          {activeTab === "profile" ? (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FF5200] border-b-2 border-[#FF5200] pb-2 flex items-center">
                  <FaIdCard className="mr-2" /> Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-[#FF5200]" />
                      <div className="group relative w-full">
                        <p className="text-gray-700">{userData.email}</p>
                        <div className="absolute -top-2 left-0 text-xs text-gray-500">
                          Email
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-[#FF5200]" />
                      <div className="group relative w-full">
                        {isEdit ? (
                          <input
                            type="text"
                            value={userData.phone || ""}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="w-full border-b border-gray-300 focus:border-[#FF5200] focus:outline-none py-1 transition-colors"
                            placeholder="Your phone number"
                          />
                        ) : (
                          <p className="text-gray-700">
                            {userData.phone || "Not provided"}
                          </p>
                        )}
                        <div className="absolute -top-2 left-0 text-xs text-gray-500">
                          Phone
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="text-[#FF5200] mt-1" />
                      <div className="group relative w-full">
                        {isEdit ? (
                          <div className="space-y-3 w-full">
                            <input
                              type="text"
                              value={userData.address?.line1 || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "address.line1",
                                  e.target.value,
                                  true
                                )
                              }
                              className="w-full border-b border-gray-300 focus:border-[#FF5200] focus:outline-none py-1 transition-colors"
                              placeholder="Address Line 1"
                            />
                            <input
                              type="text"
                              value={userData.address?.line2 || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "address.line2",
                                  e.target.value,
                                  true
                                )
                              }
                              className="w-full border-b border-gray-300 focus:border-[#FF5200] focus:outline-none py-1 transition-colors"
                              placeholder="Address Line 2"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-700">
                              {userData.address?.line1 || "Not provided"}
                            </p>
                            <p className="text-gray-700">
                              {userData.address?.line2 || ""}
                            </p>
                          </div>
                        )}
                        <div className="absolute -top-2 left-0 text-xs text-gray-500">
                          Address
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FF5200] border-b-2 border-[#FF5200] pb-2 flex items-center">
                  <FaUserCircle className="mr-2" /> Personal Information
                </h3>
                <div className="space-y-5">
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      <FaTransgender className="text-[#FF5200]" />
                      <div className="group relative w-full">
                        {isEdit ? (
                          <select
                            value={userData.gender || ""}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                            className="w-full border-b border-gray-300 focus:border-[#FF5200] focus:outline-none py-1 bg-transparent transition-colors"
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">
                              Prefer not to say
                            </option>
                          </select>
                        ) : (
                          <p className="text-gray-700">
                            {userData.gender || "Not provided"}
                          </p>
                        )}
                        <div className="absolute -top-2 left-0 text-xs text-gray-500">
                          Gender
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      <FaBirthdayCake className="text-[#FF5200]" />
                      <div className="group relative w-full">
                        {isEdit ? (
                          <input
                            type="date"
                            value={userData.dob || ""}
                            onChange={(e) =>
                              handleInputChange("dob", e.target.value)
                            }
                            className="w-full border-b border-gray-300 focus:border-[#FF5200] focus:outline-none py-1 transition-colors"
                          />
                        ) : (
                          <p className="text-gray-700">
                            {userData.dob
                              ? new Date(userData.dob).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : "Not provided"}
                          </p>
                        )}
                        <div className="absolute -top-2 left-0 text-xs text-gray-500">
                          Date of Birth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <MyBookings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
