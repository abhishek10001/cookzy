import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";
import { CookContext } from "../context/CookContext.jsx";
import cookzybg from '../assets/assets_admin/bg-cookzy.jpg';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { cToken, setCToken } = useContext(CookContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validate input fields
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      let endpoint = state === "Admin" 
        ? "/api/admin/login-admin" 
        : "/api/cook/cook-login";

      const { data } = await axios.post(
        backendUrl + endpoint,
        { 
          email, 
          password 
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (data.success) {
        if (state === "Admin") {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success("Admin logged in successfully");
          navigate("/admin-dashboard");
        } else {
          localStorage.setItem('cToken', data.token);
          setCToken(data.token);
          toast.success("Cook logged in successfully");
          navigate("/cook-dashboard");
        }
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 
                           "Invalid credentials. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cookzybg})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <motion.form 
            onSubmit={onSubmitHandler}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome to CookZy
              </h1>
              <p className="text-gray-600">
                {state === "Admin" ? "Admin Portal" : "Cook Portal"}
              </p>
            </motion.div>

            {/* Role Switch */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-full"
            >
              {["Admin", "Cook"].map((role) => (
                <motion.button
                  key={role}
                  type="button"
                  onClick={() => setState(role)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    state === role
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {role}
                </motion.button>
              ))}
            </motion.div>

            {/* Form Fields */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center text-sm text-gray-600"
            >
              {state === "Admin" ? "Are you a Cook?" : "Are you an Admin?"}{" "}
              <button
                type="button"
                onClick={() => setState(state === "Admin" ? "Cook" : "Admin")}
                className="text-primary font-medium hover:underline"
              >
                Switch to {state === "Admin" ? "Cook" : "Admin"} Login
              </button>
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;