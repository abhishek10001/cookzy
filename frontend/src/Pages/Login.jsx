import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import cookzybg from '../assets/assets_frontend/cookzy-bg.png';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          console.log(data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="w-full" style={{ backgroundImage: `url(${cookzybg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
       <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex  " >
      <div className="flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border border-primary rounded-lg mr-32">
        <p className="text-3xl font-bold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          please {state === "Sign Up" ? "Create Account" : "Login"} to Book your
          Cook
        </p>
        {state === "Sign Up" && (
          <div>
            <p>full Name</p>
            <input
              className="border border-primary rounded-lg w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}
        <div>
          <p>E-mail</p>
          <input
            className="border border-primary rounded-lg w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <p>Password</p>
          <input
            className="border border-primary rounded-lg w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className=" bg-primary text-white rounded-full py-3"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already Have an account ?
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Click Here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
    </div>
   
  );
};

export default Login;
