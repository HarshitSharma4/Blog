import React from "react";

function Hamburger({ isNavOpen, setIsNavOpen, setProfile }) {
  return (
    <button
      className="flex md:hidden gap-2 flex-col text-lg items-center justify-center text-textH "
      onClick={() => {
        setProfile(false);
        setIsNavOpen(!isNavOpen);
      }}
    >
      <div
        className="w-10 h-1 bg-accent transition-all duration-300"
        style={
          isNavOpen
            ? {
                transform: "rotate(-45deg)",
                height: "0.15rem",
              }
            : {}
        }
      ></div>
      <div
        className="w-10 h-1 bg-accent transition-all duration-300"
        style={
          isNavOpen
            ? {
                display: "none",
              }
            : {}
        }
      ></div>
      <div
        className="w-10 h-1 bg-accent relative bottom-[0.71rem] transition-all duration-300"
        style={
          isNavOpen
            ? { transform: "rotate(45deg)", height: "0.15rem" }
            : { bottom: "0" }
        }
      ></div>
    </button>
  );
}

export default Hamburger;
