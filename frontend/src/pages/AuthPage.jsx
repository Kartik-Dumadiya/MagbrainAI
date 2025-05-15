import React, { useState } from "react";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import googleLight from "../assets/google_light.png";
import googleBold from "../assets/google_bold.png";
import githubLight from "../assets/github_light.png";
import githubBold from "../assets/github_bold.png";
import dropboxLight from "../assets/dropbox_light.png";
import dropboxBold from "../assets/dropbox_bold.png";

const icons = [
  { id: "google", light: googleLight, bold: googleBold, alt: "Sign up with Google" },
  { id: "github", light: githubLight, bold: githubBold, alt: "Sign up with GitHub" },
  { id: "dropbox", light: dropboxLight, bold: dropboxBold, alt: "Sign up with Dropbox" },
];

const AuthPage = () => {
  const [isSignin, setIsSignin] = useState(true); // State to toggle between Signin and Signup
  const [hovered, setHovered] = useState(null);

  const toggleAuthMode = () => {
    setIsSignin(!isSignin);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white to-blue-100">
      <div className="relative flex w-full max-w-4xl h-[500px] bg-white shadow-2xl rounded-[30px] overflow-hidden">
        {/* Animated Blue Section */}
        <div
          className={`absolute h-full w-full bg-[#5A55B1] transition-transform duration-700 z-10 rounded-[30px] ${isSignin ? "animate-expand-left" : "animate-expand-right"
            }`}
        ></div>

        {/* Left Section */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 text-white flex flex-col items-center justify-center p-8 z-20 transform transition-all duration-700 ${isSignin ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
        >
          <h1 className="text-4xl font-bold">Hello, Friend!</h1>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <button
              onClick={toggleAuthMode}
              className="underline hover:text-blue-200 transition"
            >
              Create Account
            </button>
          </p>
        </div>

        {/* Right Section */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 text-white flex flex-col items-center justify-center p-8 z-20 transform transition-all duration-700 ${isSignin ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
            }`}
        >
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <button
              onClick={toggleAuthMode}
              className="underline hover:text-blue-200 transition"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Form Section */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-white flex flex-col items-center justify-center p-8 z-30 transform transition-all duration-700 ${isSignin ? "left-1/2 translate-x-0" : "left-0 -translate-x-0"
            }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {isSignin ? "Sign In" : "Sign Up"}
          </h2>
          <div className="flex space-x-4 mb-6">
            {icons.map(({ id, light, bold, alt }) => (
              <div
                key={id}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative border border-gray-300 rounded-xl p-2 hover:border-gray-500 transition-colors duration-300 h-10 w-10 flex items-center justify-center cursor-pointer ${id === "github" && hovered === id ? "bg-black" : ""
                  }`}
              >
                <img
                  src={light}
                  alt={alt}
                  className={`object-contain transition-opacity ease-in-out ${hovered === id ? "hidden" : "opacity-100"
                    }`}
                />
                <img
                  src={bold}
                  alt={alt}
                  className={`object-contain transition-opacity duration-300 ease-in-out ${hovered === id ? "opacity-100" : "hidden"
                    }`}
                />
              </div>
            ))}
          </div>
          {isSignin ? <SigninForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

// import { useState, useEffect } from "react";

// // Importing the original SigninForm and SignupForm components
// // These would normally be imported from your component files
// const SigninForm = () => {
//   // Using dummy state instead of actual form submission logic for the demo
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signing in with:", formData);
//   };

//   return (
//     <div onSubmit={handleSubmit} className="space-y-4 w-full max-w-[350px] gap-2 flex flex-col items-center justify-center">
//       <div className="w-full max-w-[250px]">
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300"
//           required
//         />
//       </div>
//       <div className="w-full max-w-[250px]">
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
//       >
//         SIGN IN
//       </button>
//     </div>
//   );
// };

// const SignupForm = () => {
//   // Using dummy state instead of actual form submission logic for the demo
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signing up with:", formData);
//   };

//   return (
//     <div
//       onSubmit={handleSubmit}
//       className="space-y-4 w-full max-w-[350px] gap-2 flex flex-col items-center justify-center"
//     >
//       <div className="w-full max-w-[250px]">
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300"
//           required
//         />
//       </div>
//       <div className="w-full max-w-[250px]">
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300"
//           required
//         />
//       </div>
//       <div className="w-full max-w-[250px]">
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full px-4 py-2 rounded-lg bg-[#EDEDED] focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
//       >
//         SIGN UP
//       </button>
//     </div>
//   );
// };

// export default function EnhancedAuthPage() {
//   const [isSignin, setIsSignin] = useState(true);
//   const [animationPhase, setAnimationPhase] = useState("initial");
//   const [hovered, setHovered] = useState(null);

//   // Transition phases:
//   // initial -> expand -> moveRight/moveLeft -> contract -> signedin/signedup

//   useEffect(() => {
//     if (isSignin) {
//       setAnimationPhase("expand-left");

//       const expandTimer = setTimeout(() => {
//         setAnimationPhase("move-right");

//         const moveTimer = setTimeout(() => {
//           setAnimationPhase("contract-right");

//           const contractTimer = setTimeout(() => {
//             setAnimationPhase("signedin");
//           }, 500);

//           return () => clearTimeout(contractTimer);
//         }, 500);

//         return () => clearTimeout(moveTimer);
//       }, 500);

//       return () => clearTimeout(expandTimer);
//     } else {
//       setAnimationPhase("expand-right");

//       const expandTimer = setTimeout(() => {
//         setAnimationPhase("move-left");

//         const moveTimer = setTimeout(() => {
//           setAnimationPhase("contract-left");

//           const contractTimer = setTimeout(() => {
//             setAnimationPhase("signedup");
//           }, 500);

//           return () => clearTimeout(contractTimer);
//         }, 500);

//         return () => clearTimeout(moveTimer);
//       }, 500);

//       return () => clearTimeout(expandTimer);
//     }
//   }, [isSignin]);

//   const toggleAuthMode = () => {
//     setIsSignin(!isSignin);
//   };

//   // Social icons with the original images from your code
//   const socialIcons = [
//     { id: "google", name: "Google" },
//     { id: "github", name: "GitHub" },
//     { id: "dropbox", name: "Dropbox" }
//   ];

//   return (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white to-blue-100">
//       <div className="relative flex w-full max-w-4xl h-[500px] bg-white shadow-2xl rounded-[30px] overflow-hidden">
//         {/* Colored Background Panel */}
//         <div
//           className={`absolute h-full bg-[#5A55B1] transition-all duration-700 ease-in-out z-10 
//             ${animationPhase === "initial" ? "w-1/2 left-0" : 
//               animationPhase === "expand-left" ? "w-full left-0" : 
//               animationPhase === "move-right" ? "w-full left-0" : 
//               animationPhase === "contract-right" ? "w-1/2 left-1/2 rounded-l-[100px]" : 
//               animationPhase === "signedin" ? "w-1/2 left-1/2 rounded-l-[100px]" : 
//               animationPhase === "expand-right" ? "w-full left-0" : 
//               animationPhase === "move-left" ? "w-full left-0" : 
//               animationPhase === "contract-left" ? "w-1/2 left-0 rounded-r-[100px]" : 
//               "w-1/2 left-0 rounded-r-[100px]"
//             }`}
//         >
//           {/* Animated glowing orbs */}
//           <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white opacity-10 animate-pulse-slow"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-white opacity-5 animate-pulse-medium"></div>
//           <div className="absolute top-3/4 left-3/4 w-24 h-24 rounded-full bg-white opacity-10 animate-pulse-fast"></div>
//         </div>

//         {/* Left Content Panel - Sign In Message */}
//         <div
//           className={`absolute top-0 left-0 h-full w-1/2 text-white flex flex-col items-center justify-center p-8 z-20 transition-all duration-700 
//             ${(animationPhase === "signedin" || animationPhase === "contract-left" || animationPhase === "move-left") ? "opacity-0 -translate-x-full" : 
//               (animationPhase === "expand-left" || animationPhase === "expand-right" || animationPhase === "move-right") ? "opacity-0" : 
//               "opacity-100 translate-x-0"}`}
//         >
//           <h1 className="text-4xl font-bold mb-6">Hello, Friend!</h1>
//           <p className="mt-4 text-center mb-8">
//             Don't have an account?
//           </p>
//           <button
//             onClick={toggleAuthMode}
//             className="px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#5A55B1] transition-all duration-300 transform hover:scale-105"
//             disabled={animationPhase !== "initial" && animationPhase !== "signedin" && animationPhase !== "signedup"}
//           >
//             Create Account
//           </button>
//         </div>

//         {/* Right Content Panel - Sign Up Message */}
//         <div
//           className={`absolute top-0 right-0 h-full w-1/2 text-white flex flex-col items-center justify-center p-8 z-20 transition-all duration-700 
//             ${(animationPhase === "signedup" || animationPhase === "contract-right" || animationPhase === "move-right") ? "opacity-0 translate-x-full" : 
//               (animationPhase === "expand-left" || animationPhase === "expand-right" || animationPhase === "move-left") ? "opacity-0" : 
//               "opacity-100 translate-x-0"}`}
//         >
//           <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
//           <p className="mt-4 text-center mb-8">
//             Already have an account?
//           </p>
//           <button
//             onClick={toggleAuthMode}
//             className="px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#5A55B1] transition-all duration-300 transform hover:scale-105"
//             disabled={animationPhase !== "initial" && animationPhase !== "signedin" && animationPhase !== "signedup"}
//           >
//             Sign In
//           </button>
//         </div>

//         {/* Form Section - SignIn */}
//         <div
//           className={`absolute top-0 h-full w-1/2 bg-white flex flex-col items-center justify-center p-8 z-30 transition-all duration-700 
//             ${animationPhase === "signedin" || animationPhase === "contract-right" ? "right-0 translate-x-0 opacity-100" : 
//               animationPhase === "expand-left" || animationPhase === "move-right" ? "right-0 translate-x-full opacity-0" : 
//               animationPhase === "initial" ? "right-0 translate-x-0 opacity-100" : 
//               "right-full translate-x-0 opacity-0"}`}
//         >
//           <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign In</h2>

//           {/* Social Icons */}
//           <div className="flex space-x-4 mb-6">
//             {socialIcons.map(({ id, name }) => (
//               <div
//                 key={id}
//                 onMouseEnter={() => setHovered(id)}
//                 onMouseLeave={() => setHovered(null)}
//                 className={`relative border border-gray-300 rounded-xl p-2 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-10 w-10 flex items-center justify-center cursor-pointer ${
//                   id === "github" && hovered === id ? "bg-black" : ""
//                 }`}
//               >
//                 <span className={`absolute -bottom-6 text-xs font-medium transition-all duration-300 ${
//                   hovered === id ? "opacity-100" : "opacity-0"
//                 }`}>{name}</span>
//               </div>
//             ))}
//           </div>

//           <SigninForm />
//         </div>

//         {/* Form Section - SignUp */}
//         <div
//           className={`absolute top-0 h-full w-1/2 bg-white flex flex-col items-center justify-center p-8 z-30 transition-all duration-700 
//             ${animationPhase === "signedup" || animationPhase === "contract-left" ? "left-0 translate-x-0 opacity-100" : 
//               animationPhase === "expand-right" || animationPhase === "move-left" ? "left-0 -translate-x-full opacity-0" : 
//               animationPhase === "initial" ? "left-full translate-x-0 opacity-0" : 
//               "left-0 translate-x-0 opacity-0"}`}
//         >
//           <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>

//           {/* Social Icons */}
//           <div className="flex space-x-4 mb-6">
//             {socialIcons.map(({ id, name }) => (
//               <div
//                 key={id}
//                 onMouseEnter={() => setHovered(id)}
//                 onMouseLeave={() => setHovered(null)}
//                 className={`relative border border-gray-300 rounded-xl p-2 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-10 w-10 flex items-center justify-center cursor-pointer ${
//                   id === "github" && hovered === id ? "bg-black" : ""
//                 }`}
//               >
//                 <span className={`absolute -bottom-6 text-xs font-medium transition-all duration-300 ${
//                   hovered === id ? "opacity-100" : "opacity-0"
//                 }`}>{name}</span>
//               </div>
//             ))}
//           </div>

//           <SignupForm />
//         </div>
//       </div>

//       {/* Add global animations */}
//       <style jsx global>{`
//         @keyframes pulse-slow {
//           0%, 100% { transform: scale(1); opacity: 0.05; }
//           50% { transform: scale(1.1); opacity: 0.1; }
//         }
//         @keyframes pulse-medium {
//           0%, 100% { transform: scale(1); opacity: 0.05; }
//           50% { transform: scale(1.15); opacity: 0.15; }
//         }
//         @keyframes pulse-fast {
//           0%, 100% { transform: scale(1); opacity: 0.1; }
//           50% { transform: scale(1.2); opacity: 0.2; }
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 6s ease-in-out infinite;
//         }
//         .animate-pulse-medium {
//           animation: pulse-medium 4s ease-in-out infinite;
//         }
//         .animate-pulse-fast {
//           animation: pulse-fast 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
