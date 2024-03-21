import React from "react";
import logo from "../../assets/blog.png";
function Logo({ className = "" }) {
  return (
    <div className={`${className}`}>
      <img className="h-full w-full object-cover" src={logo} alt="logo image" />
    </div>
  );
}

export default Logo;
