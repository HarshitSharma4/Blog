import React from "react";
function Container({ children, className }) {
  return (
    <div className={`w-full lg:w-[80%] min-h-screen mx-auto p-4 ${className}`}>
      {children}
    </div>
  );
}
export default Container;
