import React, { useState } from "react";
import axios from "axios";

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData,
        { withCredentials: true }
      );
      alert(response.data.message || "Login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      setError(
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[350px] gap-2 flex flex-col items-center justify-center">
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <div className="w-[250px] relative">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          placeholder="Email"
          className={`w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none transition-all duration-300
            ${focusedField === "email" ? "ring ring-blue-300 shadow-lg transform scale-105" : ""}
          `}
          required
        />
        <div className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out
          ${focusedField === "email" ? "w-full" : "w-0"}`}></div>
      </div>
      <div className="w-[250px] relative">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          placeholder="Password"
          className={`w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none transition-all duration-300
            ${focusedField === "password" ? "ring ring-blue-300 shadow-lg transform scale-105" : ""}
          `}
          required
        />
        <div className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out
          ${focusedField === "password" ? "w-full" : "w-0"}`}></div>
      </div>
      <button
        type="submit"
        className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 
          transform hover:scale-105 hover:shadow-lg active:scale-95"
      >
        SIGN IN
      </button>
    </form>
  );
};

export default SigninForm;