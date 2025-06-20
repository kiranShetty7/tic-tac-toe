import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 