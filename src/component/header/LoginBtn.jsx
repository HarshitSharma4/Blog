import React from "react";
import login from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";

function LoginBtn({ className = "", type = "button", setProfile, ...prop }) {
  const Navigate = useNavigate();
  return (
    <div className="flex items-end pb-7 w-full justify-center h-full">
      <Button
        type={type}
        className={`${className}`}
        onClick={() => {
          Navigate("/login");
          setProfile(false);
        }}
        {...prop}
      >
        <img className="h-4 w-4" src={login} alt="logout image" />
        LogIn
      </Button>
    </div>
  );
}

export default LoginBtn;
