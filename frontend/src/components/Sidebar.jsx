import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaBook, FaMicrophone, FaChartBar, FaCreditCard, FaKey, FaQuestionCircle } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Agents", icon: <FaUser /> },
    { name: "Knowledge Base", icon: <FaBook /> },
    { name: "Voice AI", icon: <FaMicrophone /> },
    { name: "Analytics", icon: <FaChartBar /> },
    { name: "Billing", icon: <FaCreditCard /> },
    { name: "API Key", icon: <FaKey /> },
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
            className="p-4 hover:bg-gray-700 cursor-pointer flex items-center"
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </motion.div>
        ))}
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">Kartik Dumadiya</p>
            <p className="text-sm text-gray-400">kartikdumadiya@gmail.com</p>
          </div>
        </div>
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