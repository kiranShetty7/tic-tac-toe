import React from "react";

const Button = ({ children, className = "", variant = "solid", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md transition-colors cursor-pointer";

  const variants = {
    solid: "bg-black text-white hover:bg-gray-800",
    outlined: "border border-black text-black",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
