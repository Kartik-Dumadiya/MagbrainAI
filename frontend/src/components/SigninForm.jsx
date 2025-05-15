// import React, { useState } from "react";

// const SigninForm = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem("token", data.token); // Save JWT token
//         window.location.href = "/dashboard"; // Redirect to dashboard
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 w-[350px] gap-2 flex flex-col items-center justify-center">
//       <div className="w-[250px]">
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none focus:ring focus:ring-blue-300"
//           required
//         />
//       </div>
//       <div className="w-[250px]">
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none focus:ring focus:ring-blue-300"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//       >
//         SIGN IN
//       </button>
//     </form>
//   );
// };

// export default SigninForm;

import React, { useState } from "react";

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Save JWT token
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[350px] gap-2 flex flex-col items-center justify-center">
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