import React from "react";

const Header = () => {
  return (
    <div className="bg-base-200 py-6 flex items-center justify-center space-x-4">
      <img
        src="https://cdn-icons-png.flaticon.com/256/4839/4839580.png"
        alt="Logo"
        className="w-16 h-16"
      />
      <h1 className="text-3xl font-bold text-primary ">
        Store Delivery Zone Checker
      </h1>
    </div>
  );
};

export default Header;