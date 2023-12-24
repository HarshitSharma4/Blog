import React from "react";

function Button({ children, className = "", type = "button", ...prop }) {
  return (
    <button
      type={type}
      className={`bg-primary shadow hover:shadow-lg cursor-pointer hover:shadow-secondary flex justify-between gap-4 rounded-md py-2 px-5 text-base font-semibold items-center ${className}`}
      {...prop}
    >
      {children}
    </button>
  );
}

export default Button;
