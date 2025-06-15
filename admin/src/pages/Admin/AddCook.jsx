import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaUtensils, FaPlus, FaSpinner } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const handledishChange = (index, value) => {
    const updatedDishes = [...dishes];
    updatedDishes[index] = value;
    setDishes(updatedDishes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!cookImg) {
        return toast.error("Image Not Selected");
      }
      setIsLoading(true);

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
      const signatureDishObj = {
        dish1: dishes[0] || "",
        dish2: dishes[1] || "",
        dish3: dishes[2] || "",
        dish4: dishes[3] || "",
        dish5: dishes[4] || "",
        dish6: dishes[5] || ""
      };
      formData.append("signatureDish", JSON.stringify(signatureDishObj));
      formData.append("about", about);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-cook`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
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
        setPreviewImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Failed to add cook");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCookImg(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="m-5 w-full max-h-[80vh] overflow-y-auto flex justify-center"
    >
      <div className="bg-white px-8 py-8 border border-gray-200 rounded-lg shadow-sm w-full max-w-4xl">
        {/* Upload Image */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center"
        >
          <label
            htmlFor="cook-img"
            className="cursor-pointer transition-all duration-300 hover:opacity-80 group"
          >
            <div className="relative">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                className="bg-gray-100 rounded-full h-40 w-40 object-cover border-4 border-gray-200 group-hover:border-primary transition-colors"
                alt="Cook preview"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlus className="text-white text-2xl" />
              </div>
            </div>
          </label>
          <input
            type="file"
            id="cook-img"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <p className="mt-2 text-gray-600 text-sm">
            Upload cook's profile image
          </p>
        </motion.div>

        {/* Cook Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaUser className="text-primary" />
              Cook Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter cook's name"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              Cook Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter cook's email"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaLock className="text-primary" />
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </motion.div>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              Address Line 1
            </label>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Enter address line 1"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              Address Line 2
            </label>
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Enter address line 2"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </motion.div>
        </div>

        {/* Experience & Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaBriefcase className="text-primary" />
              Experience
            </label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none bg-white cursor-pointer hover:border-primary"
              required
            >
              <option value="0-1 years">0-1 years (Beginner)</option>
              <option value="1-3 years">1-3 years (Junior)</option>
              <option value="3-5 years">3-5 years (Intermediate)</option>
              <option value="5-10 years">5-10 years (Senior)</option>
              <option value="10+ years">10+ years (Expert)</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaRupeeSign className="text-primary" />
              Fees (₹/hr)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="Enter hourly rate"
                className="pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all w-full"
                required
              />
            </div>
          </motion.div>
        </div>

        {/* Speciality & Signature Dishes */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col mb-6"
          >
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaUtensils className="text-primary" />
              Speciality
            </label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none bg-white cursor-pointer hover:border-primary"
              required
            >
              <option value="Italian Cuisine">Italian Cuisine</option>
              <option value="Chinese Cuisine">Chinese Cuisine</option>
              <option value="Indian Cuisine">Indian Cuisine</option>
              <option value="Mexican Cuisine">Mexican Cuisine</option>
              <option value="French Cuisine">French Cuisine</option>
              <option value="Japanese Cuisine">Japanese Cuisine</option>
              <option value="Mediterranean Cuisine">Mediterranean Cuisine</option>
              <option value="Thai Cuisine">Thai Cuisine</option>
              <option value="Pastry & Deserts">Pastry & Desserts</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-col"
          >
            <label className="text-gray-700 font-medium mb-3 flex items-center gap-2">
              <FaUtensils className="text-primary" />
              Signature Dishes
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <input
                  key={num}
                  value={dishes[index]}
                  onChange={(e) => handledishChange(index, e.target.value)}
                  type="text"
                  placeholder={`Dish ${num}`}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-8"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaUser className="text-primary" />
              About
            </label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              placeholder="Tell us about the cook's background, cooking style, and specialties..."
              rows="4"
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            ></textarea>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex justify-end mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Adding Cook...
              </>
            ) : (
              <>
                <FaPlus />
                Add Cook
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default AddCook;
