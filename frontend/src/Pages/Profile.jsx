import React, { useState } from "react";
import { 
  FaUserCircle, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaTransgender, 
  FaBirthdayCake, 
  FaEdit, 
  FaSave 
} from 'react-icons/fa';
import { assets } from "../assets/assets_frontend/assets";
import MyBookings from "./MyBookings";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Abhishek Gangwar",
    image: assets.profile_pic,
    email: "abhishek@gmail.com",
    phone: "6398937329",
    address: {
      line1: "123",
      line2: "abc Street, New Delhi, India",
    },
    gender: "Male",
    dob: "2003-03-22",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (field, value, isNestedField = false) => {
    setUserData(prev => {
      if (isNestedField) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  return (
    <div className="flex-col min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img 
              src={userData.image} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-[#FF5200] object-cover"
            />
            {isEdit && (
              <div className="absolute bottom-0 right-0 bg-[#FF5200] text-white p-2 rounded-full">
                <FaEdit />
              </div>
            )}
          </div>
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-2xl font-bold text-center w-full border-b-2 border-[#FF5200] focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#FF5200] border-b-2 border-[#FF5200] pb-2">
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-[#FF5200]" />
              <p className="text-gray-700">{userData.email}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-[#FF5200]" />
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full border-b border-[#FF5200] focus:outline-none"
                />
              ) : (
                <p className="text-gray-700">{userData.phone}</p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-[#FF5200]" />
              {isEdit ? (
                <div className="space-y-2 w-full">
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) => handleInputChange('address.line1', e.target.value, true)}
                    className="w-full border-b border-[#FF5200] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) => handleInputChange('address.line2', e.target.value, true)}
                    className="w-full border-b border-[#FF5200] focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-gray-700">{userData.address.line1}</p>
                  <p className="text-gray-700">{userData.address.line2}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#FF5200] border-b-2 border-[#FF5200] pb-2">
            Personal Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FaTransgender className="text-[#FF5200]" />
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full border-b border-[#FF5200] focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <FaBirthdayCake className="text-[#FF5200]" />
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  className="w-full border-b border-[#FF5200] focus:outline-none"
                />
              ) : (
                <p className="text-gray-700">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="flex justify-center">
          <button 
            onClick={() => setIsEdit(!isEdit)}
            className="flex items-center space-x-2 bg-[#FF5200] text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
          >
            {isEdit ? (
              <>
                <FaSave />
                <span>Save</span>
              </>
            ) : (
              <>
                <FaEdit />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>
      </div>
      <MyBookings/>
    </div>
  );
};

export default Profile;


// import React, { useState } from "react";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaTransgender,
//   FaBirthdayCake,
//   FaEdit,
//   FaSave,
//   FaCheckCircle,
//   FaClock,
//   FaStar,
//   FaFileInvoice,
//   FaQuestionCircle
// } from "react-icons/fa";
// import { assets } from "../assets/assets_frontend/assets";

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     name: "Abhishek Gangwar",
//     image: assets.profile_pic,
//     email: "abhishek@gmail.com",
//     phone: "6398937329",
//     address: {
//       line1: "123",
//       line2: "abc Street, New Delhi, India",
//     },
//     gender: "Male",
//     dob: "2003-03-22",
//   });

//   const [isEdit, setIsEdit] = useState(false);

//   const handleInputChange = (field, value, isNestedField = false) => {
//     setUserData((prev) => {
//       if (isNestedField) {
//         const [parent, child] = field.split(".");
//         return {
//           ...prev,
//           [parent]: {
//             ...prev[parent],
//             [child]: value,
//           },
//         };
//       }
//       return {
//         ...prev,
//         [field]: value,
//       };
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 space-y-6">
//       {/* Profile Section */}
//       <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 space-y-6">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center space-y-4">
//           <div className="relative">
//             <img
//               src={userData.image}
//               alt="Profile"
//               className="w-32 h-32 rounded-full border-4 border-[#FF5200] object-cover"
//             />
//             {isEdit && (
//               <div className="absolute bottom-0 right-0 bg-[#FF5200] text-white p-2 rounded-full">
//                 <FaEdit />
//               </div>
//             )}
//           </div>
//           {isEdit ? (
//             <input
//               type="text"
//               value={userData.name}
//               onChange={(e) => handleInputChange("name", e.target.value)}
//               className="text-2xl font-bold text-center w-full border-b-2 border-[#FF5200] focus:outline-none"
//             />
//           ) : (
//             <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
//           )}
//         </div>

//         {/* Contact Information */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-[#FF5200] border-b-2 border-[#FF5200] pb-2">
//             Contact Information
//           </h3>
//           {/* Email */}
//           <div className="flex items-center space-x-3">
//             <FaEnvelope className="text-[#FF5200]" />
//             <p className="text-gray-700">{userData.email}</p>
//           </div>
//           {/* Phone */}
//           <div className="flex items-center space-x-3">
//             <FaPhone className="text-[#FF5200]" />
//             {isEdit ? (
//               <input
//                 type="text"
//                 value={userData.phone}
//                 onChange={(e) => handleInputChange("phone", e.target.value)}
//                 className="w-full border-b border-[#FF5200] focus:outline-none"
//               />
//             ) : (
//               <p className="text-gray-700">{userData.phone}</p>
//             )}
//           </div>
//           {/* Address */}
//           <div className="flex items-center space-x-3">
//             <FaMapMarkerAlt className="text-[#FF5200]" />
//             {isEdit ? (
//               <div className="space-y-2 w-full">
//                 <input
//                   type="text"
//                   value={userData.address.line1}
//                   onChange={(e) =>
//                     handleInputChange("address.line1", e.target.value, true)
//                   }
//                   className="w-full border-b border-[#FF5200] focus:outline-none"
//                 />
//                 <input
//                   type="text"
//                   value={userData.address.line2}
//                   onChange={(e) =>
//                     handleInputChange("address.line2", e.target.value, true)
//                   }
//                   className="w-full border-b border-[#FF5200] focus:outline-none"
//                 />
//               </div>
//             ) : (
//               <div>
//                 <p className="text-gray-700">{userData.address.line1}</p>
//                 <p className="text-gray-700">{userData.address.line2}</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold text-[#FF5200] border-b-2 border-[#FF5200] pb-2">
//             Personal Information
//           </h3>
//           {/* Gender */}
//           <div className="flex items-center space-x-3">
//             <FaTransgender className="text-[#FF5200]" />
//             {isEdit ? (
//               <select
//                 value={userData.gender}
//                 onChange={(e) => handleInputChange("gender", e.target.value)}
//                 className="w-full border-b border-[#FF5200] focus:outline-none"
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             ) : (
//               <p className="text-gray-700">{userData.gender}</p>
//             )}
//           </div>
//           {/* Date of Birth */}
//           <div className="flex items-center space-x-3">
//             <FaBirthdayCake className="text-[#FF5200]" />
//             {isEdit ? (
//               <input
//                 type="date"
//                 value={userData.dob}
//                 onChange={(e) => handleInputChange("dob", e.target.value)}
//                 className="w-full border-b border-[#FF5200] focus:outline-none"
//               />
//             ) : (
//               <p className="text-gray-700">{userData.dob}</p>
//             )}
//           </div>
//         </div>

//         {/* Edit/Save Button */}
//         <div className="flex justify-center">
//           <button
//             onClick={() => setIsEdit(!isEdit)}
//             className="flex items-center space-x-2 bg-[#FF5200] text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
//           >
//             {isEdit ? (
//               <>
//                 <FaSave />
//                 <span>Save</span>
//               </>
//             ) : (
//               <>
//                 <FaEdit />
//                 <span>Edit</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Completed Bookings Section */}
//       <Section title={"Completed Bookings"} icon={<FaCheckCircle />}>
//         {/* Add your completed bookings content here */}
//       </Section>

//       {/* Upcoming Bookings Section */}
//       {/* Upcoming Bookings Section */}
//       <Section title={"Upcoming Bookings"} icon={<FaClock />}>
//         {/* Add your upcoming bookings content here */}
//       </Section>

//       {/* My Reviews Section */}
//       <Section title={"My Reviews"} icon={<FaStar />}>
//         {/* Add your reviews content here */}
//       </Section>

//       {/* Favorite Cooks Section */}
//       <Section title={"Favorite Cooks"} icon={<FaUserCircle />}>
//         {/* Add your favorite cooks content here */}
//       </Section>

//       {/* Payment History Section */}
//       <Section title={"Payment History"} icon={<FaFileInvoice />}>
//         {/* Add your payment history content here */}
//       </Section>

//       {/* Help & Support Section */}
//       <Section title={"Help & Support"} icon={<FaQuestionCircle />}>
//         {/* Add your help and support content here */}
//       </Section>
//     </div>
//   );
// };

// // Generic Section Component
// const Section = ({ title, icon, children }) => {
//   return (
//     <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 space-y-4 mt-6">
//       <div className="flex items-center space-x-3">
//         {icon}
//         <h3 className="text-lg font-semibold text-[#FF5200]">{title}</h3>
//       </div>
//       {children}
//     </div>
//   );
// };

// export default Profile;
