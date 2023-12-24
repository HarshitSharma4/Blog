import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../aapwrite/Auth";
import exit from "../../assets/exit.png";
import { Button } from "../index";
function LogoutBtn({ className = "", type = "button", setProfile, ...prop }) {
  const dispatch = useDispatch();
  const logoutHandle = () => {
    authService.logOut().then(() => {
      dispatch(logout());
      localStorage.removeItem("login");
    });
    setProfile(false);
  };
  return (
    <div className="flex items-end pb-7 w-full justify-center h-full">
      <Button
        type={type}
        className={`${className}`}
        onClick={() => {
          logoutHandle();
        }}
        {...prop}
      >
        <img className="h-4 w-4" src={exit} alt="logout image" />
        LogOut
      </Button>
    </div>
  );
}

export default LogoutBtn;
