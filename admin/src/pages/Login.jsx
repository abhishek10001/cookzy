import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";
import { toast } from "react-toastify";
import { CookContext } from "../context/CookContext.jsx";

const Login = () => {

  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const{cToken , setCToken } = useContext(CookContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/admin/login-admin",
          { email, password }
        );
        
        if (data.success) {
            localStorage.setItem('aToken', data.token);
            setAToken(data.token);
            
        }else{
            toast.error(data.message);
        }
      }else{
        const { data } = await axios.post(
          backendUrl + "/api/cook/cook-login",
          { email, password }
        );
        
        if (data.success) {
            localStorage.setItem('cToken', data.token);
            setCToken(data.token);
            console.log(data.token);
            
        }else{
            toast.error(data.message);
        }
      }

    } catch (error) {}
  };
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center ">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-500 rounded-xl w-full p-3 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-500 rounded-xl w-full p-3 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary rounded-full w-full py-3">Login</button>
        {state === "Admin" ? (
          <p>
            Cook Login ?{" "}
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
  );
};

export default Login;
