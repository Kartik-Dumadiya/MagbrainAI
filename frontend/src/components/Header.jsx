import React from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";

const Header = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">All Agents</h1>
      <div className="flex items-center">
        <SearchBar />
        <Button label="Create an Agent" type="primary" animate />
      </div>
    </div>
  );
};

export default Header;