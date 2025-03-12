import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto item start p-8 min-w-[340px] sm:min-w-96 border border-primary rounded-lg">
        <p className="text-3xl font-bold">{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>
          please {state === "Sign Up" ? "Create Account" : "Login"} to Book your
          Cook
        </p>
        {
          state === "Sign Up" &&  <div>
          <p>E-mail</p>
          <input className="border border-primary rounded-lg w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.name)}
            value={email}
          />
        </div>
        }
        <div>
          <p>full Name</p>
          <input className="border border-primary rounded-lg w-full p-2 mt-1"
            type="text"
            onChange={(e) => setName(e.target.name)}
            value={name}
          />
        </div>
        
        <div>
          <p>Password</p>
          <input className="border border-primary rounded-lg w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.name)}
            value={password}
          />
        </div>
        <button className=" bg-primary text-white rounded-full py-3">{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" 
          ? <p>Already Have an account ?<span className="text-primary underline cursor-pointer" onClick={()=>setState('Login')}>Login Here</span></p>
          : <p>Create an account? <span className="text-primary underline cursor-pointer" onClick={()=>setState('Sign Up')}>Click Here</span> </p>
        }
      </div>
    </form>
  );
};

export default Login;
