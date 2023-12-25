import React, { useState } from "react";
import { LoginBtn, LogoutBtn, Container, Logo } from "../index";
//import { AuthService } from "../../aapwrite/Auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import acount from "../../assets/account.png";
import Hamburger from "./Hamburger";
function Navigation() {
  const authStatus = useSelector((state) => state.auth.status);
  const authDetail = useSelector((state) => state.auth.userdata);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "My Blogs",
      slug: "/my-blogs",
      active: authStatus,
    },
    {
      name: "All Blogs",
      slug: "/all-blogs",
      active: true,
    },
  ];

  const [profile, setProfile] = useState(false);
  return (
    <div className="relative py-2 sm:py-4 ">
      <nav className=" mx-auto flex justify-between items-center">
        <Hamburger
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          setProfile={setProfile}
        />
        <Link to="/">
          <Logo className="h-14 w-14" />
        </Link>
        {isNavOpen ? (
          <ul className="flex flex-col w-full md:hidden bg-accent absolute z-50 top-28 left-0 py-2">
            {navItem.map((value, key) => {
              return value.active ? (
                <Link
                  to={value.slug}
                  key={key}
                  className="text-xl px-4 py-2 font-extrabold w-full  shadow-secondary shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  {value.name}
                </Link>
              ) : null;
            })}
          </ul>
        ) : null}
        <ul className="hidden md:flex justify-evenly items-center space-x-8 relative">
          {navItem.map((value, key) => {
            return value.active ? (
              <Link
                to={value.slug}
                key={key}
                className="text-xl font-extrabold hover:underline decoration-4 underline-offset-8 transition-all duration-500"
              >
                {value.name}
              </Link>
            ) : null;
          })}
        </ul>
        <div
          onClick={() => {
            setIsNavOpen(false);
            setProfile(!profile);
          }}
        >
          <img className="h-14 w-14" src={acount} alt="acount" />
        </div>
        {profile && (
          <div className="absolute top-28 right-0 sm:w-96 z-50 w-72  sm:h-44 bg-accent p-5 rounded-md">
            <h2 className="text-xl font-bold">
              My Acount:{" "}
              {authStatus ? (
                authDetail?.email
              ) : (
                <span className="text-secondary">need to login !</span>
              )}
            </h2>
            {!authStatus ? (
              <LoginBtn setProfile={setProfile} />
            ) : (
              <LogoutBtn setProfile={setProfile} />
            )}
          </div>
        )}
      </nav>
      <div className="h-2 rounded-lg md:h-3 w-full bg-text my-4"></div>
    </div>
  );
}

export default Navigation;
