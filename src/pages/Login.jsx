import React, { useState } from "react";
import logo from "../assets/logocar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { registerUser, loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill all required fields");
      return;
    }

    try {
      let res;
      if (isLogin) {
        res = await loginUser({ email, password });
      } else {
        res = await registerUser({ name, email, password });
      }

      if (res.success) {
        // Use AuthContext login function to update state
        login(res.user, res.token);
        
        if (isLogin) {
          alert("Login successful!");
          navigate("/cars");
        } else {
          alert("Account created successfully!");
          setIsLogin(true);
        }
      } else {
        alert(res.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 md:px-8 text-white">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex absolute mt-[-700px] mr-340 w-auto h-auto bg-gray-800 p-2.5 rounded-3xl font-sans text-sm font-medium cursor-pointer hover:bg-gray-700"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="text-sm sm:text-base m-0.5 mr-1.5"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
          </svg>
          Back to Home
        </button>

        {/* Background Gradients */}
        <div className="bg-gradient-to-r from-orange-400/10 to-orange-600/10 w-70 h-70 blur-2xl mr-35 rounded-full"></div>
        <div className="bg-gradient-to-r from-orange-400/10 to-orange-600/10 w-70 h-70 blur-2xl mt-90 rounded-full"></div>

        {/* Login / Signup Box */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-110 h-auto mt-10 absolute rounded-3xl overflow-hidden transition-transform duration-500 hover:scale-[1.02] scale-100">
          {/* Logo Section */}
          <span className="mt-18 w-30 ml-40 absolute">
            <img src={logo} alt="" />
            <h1 className="ml-1 font-bold text-xl">AutoXplore</h1>
            <h2 className="mt-14 font-sans font-bold bg-gradient-to-l bg-clip-text text-transparent text-4xl absolute ml-[-100px] from-yellow-100 to-yellow-300 whitespace-nowrap">
              {isLogin ? "PremiumDrive" : "Join PremiumDrive"}
              <h3 className="text-xl font-light ml-10 mt-2 text-orange-400/70 whitespace-nowrap">
                Create your exclusive account
              </h3>
            </h2>
          </span>

          {/* Input Fields */}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="w-auto h-14 mt-70 mx-8 border border-gray-600 bg-gray-700/50 rounded-xl flex">
                <div className="bg-gradient-to-r from-orange-300/30 to-orange-500/40 w-7 h-7 ml-2 mt-3 mr-3 blur-xs rounded-full"></div>
                <input
                  className="text-orange-200/90 font-sans bg-transparent outline-none w-full"
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div
              className={`w-auto h-14 ${
                isLogin ? "mt-70" : "mt-5"
              } mx-8 border border-gray-600 bg-gray-700/50 rounded-xl flex`}
            >
              <div className="bg-gradient-to-r from-orange-300/30 to-orange-500/40 w-7 h-7 ml-2 mt-3 mr-3 blur-xs rounded-full"></div>
              <input
                className="text-orange-200/90 font-sans bg-transparent outline-none w-full"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-auto h-14 mt-5 mx-8 border border-gray-600 bg-gray-700/50 rounded-xl flex">
              <div className="bg-gradient-to-r from-orange-300/30 to-orange-500/40 w-7 h-7 ml-2 mt-3 mr-3 blur-xs rounded-full"></div>
              <input
                className="text-orange-200/90 font-sans bg-transparent outline-none w-full"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500/90 hover:bg-orange-400 inset-0 transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer w-94 h-13 mx-8 my-5 rounded-xl font-sans font-bold"
            >
              {isLogin ? "Access Premium Garage" : "Create Account"}
            </button>
          </form>

          <span className="border-b border-orange-200/15 w-auto h-1 mx-8 flex flex-col"></span>

          {/* Toggle Button */}
          <p className="text-sm font-sans flex justify-center mt-5 text-orange-200/70">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="border border-orange-400/70 w-95 h-9 mx-8 mt-2 rounded-xl font-sans text-sm font-medium text-orange-300/90 hover:bg-orange-400/10 transition-transform duration-300 hover:-translate-y-0.5"
          >
            {isLogin ? "CREATE ACCOUNT" : "LOGIN"}
          </button>

          {/* Decorations */}
          <div className="bg-gradient-to-r from-orange-400/10 to-orange-600/10 w-35 h-35 blur-xl ml-85 mt-[-630px] rounded-full"></div>
          <div className="bg-gradient-to-r from-orange-400/10 to-orange-600/10 w-35 h-35 blur-xl mt-110 ml-[-50px] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
