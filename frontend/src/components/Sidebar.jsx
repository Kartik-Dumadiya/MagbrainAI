/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaBook, FaMicrophone, FaChartBar, FaCreditCard, FaKey, FaQuestionCircle } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";
import profile from "../assets/profile.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useUser();

  const menuItems = [
    { name: "Agents", icon: <FaUser />, path: "/agents" },
    { name: "Knowledge Base", icon: <FaBook />, path: "/knowledge-base" },
    { name: "Voice AI", icon: <FaMicrophone />, path: "/voice-ai" },
    { name: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { name: "Billing", icon: <FaCreditCard />, path: "/billing" },
    { name: "API Key", icon: <FaKey />, path: "/api-key" },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-gray-800 text-white h-full flex flex-col"
    >
      {/* Sidebar Header */}
      <div className="p-4 text-2xl font-bold">MagBrain AI</div>

      {/* Menu Items */}
      <div className="flex-1">
        {menuItems.map((item, index) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            key={index}
          >
            <Link
              key={index}
              to={item.path}
              className={`p-4 flex items-center ${location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Profile or Auth Buttons Section */}
      <div className="p-4 border-t border-gray-700">
        {!loading ? (
          user ? (
            <div
              className="flex items-center cursor-pointer hover:bg-gray-700 rounded p-2 transition"
              onClick={() => navigate("/profile")}
            >
              <img
                src={profile}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/signin"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full bg-gray-500 text-white px-4 py-2 rounded text-center hover:bg-gray-600 transition"
              >
                Signup
              </Link>
            </div>
          )
        ) : (
          <div className="text-gray-400 text-sm">Loading...</div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <button className="flex items-center text-sm text-gray-400 hover:text-white">
            <FaQuestionCircle className="mr-2" /> Help Center
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;