import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";
import { toast } from "react-toastify";
import { CookContext } from "../context/CookContext.jsx";
import cookzybg from '../assets/assets_admin/bg-cookzy.jpg';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { cToken, setCToken } = useContext(CookContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validate input fields
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

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
        // Handle specific error messages from backend
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data.message || 
                             "Invalid credentials. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <div 
        className="h-[100vh]" 
        style={{ 
          backgroundImage: `url(${cookzybg})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}
      >
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
          <div className="mr-28 flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-black rounded-xl text-gray-700 text-sm shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-center w-full">
              <p className="font-bold text-3xl text-center">
                Hello {state}, Welcome to CookZy!
              </p>
            </div>
            <p className="text-2xl font-semibold m-auto">
              <span className="text-primary">{state}</span> Login
            </p>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-gray-500 rounded-xl w-full p-3 mt-1 focus:ring-2 focus:ring-primary/50 transition-all"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-gray-500 rounded-xl w-full p-3 mt-1 focus:ring-2 focus:ring-primary/50 transition-all"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button 
              type="submit" 
              className="bg-primary rounded-full w-full py-3 hover:bg-primary/90 transition-all"
            >
              Login
            </button>
            {state === "Admin" ? (
              <p>
                Cook Login?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Cook")}
                >
                  Click Here
                </span>
              </p>
            ) : (
              <p>
                Admin Login?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Admin")}
                >
                  Click Here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;