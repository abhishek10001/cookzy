import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const AddCook = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [cookImg, setCookImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [experience, setExperience] = useState("0-1 years");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("Indian Cuisine");
  const [dishes, setDishes] = useState(["", "", "", "", "", ""]);
  const [about, setAbout] = useState("");

  const handledishChange = (index, value) => {
    const updatedDishes = [...dishes];
    updatedDishes[index] = value;
    setDishes(updatedDishes);
  };

  const { backendUrl, aToken } = useContext(AdminContext);



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!cookImg) {
  //       return toast.error("Image Not Selected");
  //     }
  //     const formData = new FormData();
  //     formData.append("image", cookImg);
  //     //image name should be same as of in backend field name
  //     formData.append("name", name);
  //     formData.append("email", email);
  //     formData.append("password", password);
  //     formData.append(
  //       "address",
  //       JSON.stringify({ line1: address1, line2: address2 })
  //     );
  //     formData.append("experience", experience);
  //     formData.append("fees", fees);
  //     formData.append("speciality", speciality);
  //     dishes.forEach((dish, index) => {
  //       formData.append(`signatureDish[${index}]`, dish);
  //     });
  //     formData.append("about", about);

  //     //console log form data

  //     formData.forEach((value, key) => {
  //       console.log(`${key}: ${value}`);
  //     });

  //     console.log("Full request URL:", `${backendUrl}/api/admin/add-cook`);

  //     const { data } = await axios.post(
  //       `${backendUrl}/api/admin/add-cook`,
  //       formData,
  //       { headers: { aToken } }
  //     ); //aToken will convert into atoken as used in authAdmin middleware
  //     console.log(data);

  //     if (data.success) {
  //       console.log(data.message);
  //       toast.success(data.message);
  //     } else {
  //       console.log(data.message);
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  // toast.error(error.response?.data?.message || "Failed to add cook");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!cookImg) {
        return toast.error("Image Not Selected");
      }
      const formData = new FormData();
      formData.append("image", cookImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("speciality", speciality);
      
      // Convert dishes array to JSON string before appending
      // Filter out empty dishes
      const filteredDishes = dishes.filter(dish => dish.trim() !== "");
      formData.append("signatureDish", JSON.stringify(filteredDishes));
      
      formData.append("about", about);
  
      console.log("Full request URL:", `${backendUrl}/api/admin/add-cook`);
  
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-cook`,
        formData,
        { 
          headers: { 
            aToken,
            'Content-Type': 'multipart/form-data' 
          } 
        }
      );
      
      if (data.success) {
        console.log(data.message);
        toast.success(data.message);
        
        // Reset form after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setExperience("0-1 years");
        setFees("");
        setSpeciality("Indian Cuisine");
        setDishes(["", "", "", "", "", ""]);
        setAbout("");
        setCookImg(false);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Failed to add cook");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-5 w-full max-h-[80vh] overflow-y-auto"
    >
      {/* <h2 className="mb-5 text-2xl font-semibold text-gray-800 text-center">Add Cook</h2> */}
      <div className="bg-white px-8 py-8 border border-gray-200 rounded-lg shadow-sm w-full max-w-4xl">
        {/* Upload Image */}
        <div className="mb-8 flex flex-col items-center">
          <label
            htmlFor="cook-img"
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
          >
            <img
              src={cookImg ? URL.createObjectURL(cookImg) : assets.upload_area}
              className="bg-gray-100 rounded-full  cursor-pointer"
              alt=""
            />
          </label>
          <input
            type="file"
            id="cook-img"
            className="hidden"
            onChange={(e) => setCookImg(e.target.files[0])}
            accept="image/*"
            required
          />

          <p className="mt-2 text-gray-600 text-sm">
            Upload cook's profile image
          </p>
        </div>

        {/* Cook Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <label
              htmlFor="cook-name"
              className="text-gray-700 font-medium mb-1"
            >
              Cook Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="cook-name"
              placeholder="Abhishek"
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="cook-email"
              className="text-gray-700 font-medium mb-1"
            >
              Cook Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="cook-email"
              placeholder="cook1@gmail.com"
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="cook-password"
              className="text-gray-700 font-medium mb-1"
            >
              Cook Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="cook-password"
              placeholder="password"
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <label
              htmlFor="address-line-1"
              className="text-gray-700 font-medium mb-1"
            >
              Address Line 1
            </label>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              id="address-line-1"
              placeholder="123 Main St"
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="address-line-2"
              className="text-gray-700 font-medium mb-1"
            >
              Address Line 2
            </label>
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              id="address-line-2"
              placeholder="Apt, Suite, etc."
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Experience & Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <label
              htmlFor="cook-experience"
              className="text-gray-700 font-medium mb-1"
            >
              Cook Experience
            </label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              id="cook-experience"
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none bg-white cursor-pointer hover:border-orange-300"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f97316'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "20px",
              }}
              required
            >
              <option value="">Select experience level</option>
              <option value="0-1 years">0-1 years (Beginner)</option>
              <option value="1-3 years">1-3 years (Junior)</option>
              <option value="3-5 years">3-5 years (Intermediate)</option>
              <option value="5-10 years">5-10 years (Senior)</option>
              <option value="10+ years">10+ years (Expert)</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="cook-fees"
              className="text-gray-700 font-medium mb-1"
            >
              Cook Fees (₹/hr)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                id="cook-fees"
                placeholder="200"
                className="pl-8 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all w-full"
                required
              />
            </div>
          </div>
        </div>

        {/* Speciality & Signature Dishes */}
        <div className="mb-8">
          <div className="flex flex-col mb-6">
            <label
              htmlFor="cook-speciality"
              className="text-gray-700 font-medium mb-1"
            >
              Speciality
            </label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              id="cook-speciality"
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none bg-white cursor-pointer hover:border-orange-300"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f97316'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "20px",
              }}
              required
            >
              <option value="">Select cuisine speciality</option>
              <option value="Italian">Italian Cuisine</option>
              <option value="Chinese">Chinese Cuisine</option>
              <option value="Indian">Indian Cuisine</option>
              <option value="Mexican">Mexican Cuisine</option>
              <option value="French">French Cuisine</option>
              <option value="Japanese">Japanese Cuisine</option>
              <option value="Mediterranean">Mediterranean Cuisine</option>
              <option value="Thai">Thai Cuisine</option>
              <option value="Pastry Chef">Pastry & Desserts</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-3">
              Signature Dishes
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <input
                  value={dishes[index]}
                  onChange={(e) => handledishChange(index, e.target.value)}
                  key={num}
                  type="text"
                  placeholder={`Dish ${num}`}
                  className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-8">
          <div className="flex flex-col">
            <label
              htmlFor="cook-about"
              className="text-gray-700 font-medium mb-1"
            >
              About
            </label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              id="cook-about"
              placeholder="Tell us about the cook's background, cooking style, and specialties..."
              rows="4"
              className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-orange-600 text-white font-medium py-2.5 px-6 rounded-full transition-colors duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Cook
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCook;
