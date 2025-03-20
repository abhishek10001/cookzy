import React, { useState, useContext, useEffect } from "react";
import { CookContext } from "../../context/CookContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const CookProfile = () => {
  const { cToken, profileData, setProfileData, getProfileData } =
    useContext(CookContext);
  const { backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Custom color theme
  const themeColor = "#FF5200"; // Orange theme color

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        phone: profileData.phone,
        signatureDish: profileData.signatureDish,
        about: profileData.about,
        name: profileData.name,
        available: profileData.available,
        experience: profileData.experience
      };
      const { data } = await axios.post(
        backendUrl + "/api/cook/update-cook-profile",
        updateData,
        { headers: { cToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setIsEdit(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cToken) {
      getProfileData();
    }
  }, [cToken]);

  const handleAddressChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleSignatureDishChange = (dish, value) => {
    setProfileData((prev) => ({
      ...prev,
      signatureDish: {
        ...prev.signatureDish,
        [dish]: value
      }
    }));
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAboutChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      about: e.target.value
    }));
  };

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: themeColor }}></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg my-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Profile Image Section */}
        <div className="md:w-1/3">
          <div className="relative mb-8 group">
            <img 
              src={profileData.image} 
              alt={profileData.name} 
              className="w-full h-80 object-cover rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl"
            />
            {isEdit && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <button className="bg-white rounded-full px-4 py-2 font-medium transform hover:scale-105 transition-transform" style={{ color: themeColor }}>
                  Change Photo
                </button>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Availability Status
            </h3>
            <div className="flex items-center">
              <div className="relative inline-block w-12 mr-3 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="available" 
                  onChange={() => isEdit && setProfileData((prev) => ({...prev, available: !prev.available}))}
                  disabled={!isEdit}
                  checked={profileData.available}
                  className="opacity-0 absolute h-6 w-6"
                />
                <div className={`toggle-bg bg-gray-200 ${profileData.available ? '' : ''} h-6 w-12 rounded-full transition-colors duration-200 ease-in-out`} style={{ backgroundColor: profileData.available ? themeColor : '' }}></div>
                <span className={`toggle-dot absolute left-0 top-0 bg-white w-6 h-6 rounded-full transition duration-200 ease-in-out transform ${profileData.available ? 'translate-x-6' : ''} shadow-md`}></span>
              </div>
              <label htmlFor="available" className="font-medium text-gray-700">
                {profileData.available ? "Available for Booking" : "Not Available"}
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Booking Fee
            </h3>
            {isEdit ? (
              <div className="relative mt-2">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) => handleInputChange("fees", e.target.value)}
                  className="w-full p-2 pl-8 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: themeColor }}
                />
              </div>
            ) : (
              <p className="text-2xl font-bold" style={{ color: themeColor }}>${profileData.fees}<span className="text-sm text-gray-500 font-normal">/session</span></p>
            )}
          </div>

          <button 
            onClick={isEdit ? updateProfile : () => setIsEdit(true)}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full shadow text-white font-medium tracking-wide transition-all duration-300 flex items-center justify-center"
            style={{ backgroundColor: themeColor, opacity: isLoading ? 0.8 : 1 }}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                {isEdit ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                  </>
                )}
              </span>
            )}
          </button>
        </div>

        {/* Profile Details Section */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b border-gray-200 pb-2 flex items-center">
            {isEdit ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                style={{ focusRingColor: themeColor }}
              />
            ) : (
              <>
                <span className="mr-2">{profileData.name}</span>
                <span className="text-sm py-1 px-3 rounded-full font-medium text-white" style={{ backgroundColor: themeColor }}>{profileData.speciality} Chef</span>
              </>
            )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: themeColor }}
                />
              ) : (
                <p className="font-semibold text-gray-800">{profileData.name}</p>
              )}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="font-semibold text-gray-800">{profileData.email}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: themeColor }}
                />
              ) : (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="font-semibold text-gray-800">{profileData.phone}</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <p className="text-sm text-gray-500 mb-1">Experience</p>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-gray-800">{profileData.experience} years</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              About
            </h3>
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={handleAboutChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all min-h-32"
                placeholder="Tell clients about yourself, your culinary philosophy, and what makes your cooking special..."
                style={{ focusRingColor: themeColor }}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.about}</p>
            )}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </h3>
            {isEdit ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profileData.address.line1}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  placeholder="Address Line 1"
                  className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: themeColor }}
                />
                <input
                  type="text"
                  value={profileData.address.line2}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  placeholder="Address Line 2"
                  className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                  style={{ focusRingColor: themeColor }}
                />
              </div>
            ) : (
              <p className="text-gray-700 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>
                  {profileData.address.line1}
                  {profileData.address.line2 && <>, {profileData.address.line2}</>}
                </span>
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Signature Dishes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isEdit ? (
                // Edit mode for signature dishes
                Object.entries(profileData.signatureDish || {}).map(([key, dish]) => (
                  <div key={key} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
                    <input
                      type="text"
                      value={dish}
                      onChange={(e) => handleSignatureDishChange(key, e.target.value)}
                      placeholder={`Dish ${key.replace('dish', '')}`}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                      style={{ focusRingColor: themeColor }}
                    />
                  </div>
                ))
              ) : (
                // View mode for signature dishes
                Object.entries(profileData.signatureDish || {})
                  .filter(([_, dish]) => dish)
                  .map(([key, dish]) => (
                    <div key={key} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: themeColor }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <p className="text-gray-700 font-medium">{dish}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookProfile;