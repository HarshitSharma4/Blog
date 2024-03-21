import React, { useState } from "react";
import { LoginBtn, LogoutBtn, Logo } from "../index";
import { MdAccountCircle } from "react-icons/md";
//import { AuthService } from "../../aapwrite/Auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";
function Navigation() {
  const authStatus = useSelector((state) => state.auth.status);
  const authDetail = useSelector((state) => state.auth.profile);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Search",
      slug: "/search",
      active: true,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];

  const [profile, setProfile] = useState(false);
  return (
    <div className="relative py-2 px-4 sm:py-4 bg-primary rounded-2xl shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)]">
      <nav className=" mx-auto flex justify-between items-center">
        <Hamburger
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          setProfile={setProfile}
        />
        <Link to="/">
          <Logo className="h-14 w-14 md:h-16 md:w-16" />
        </Link>
        {isNavOpen ? (
          <ul className="flex flex-col w-full rounded-2xl gap-4 md:hidden bg-accent absolute z-50 top-24 left-0 py-2 shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] h-80">
            {navItem.map((value, key) => {
              return value.active ? (
                <Link
                  to={value.slug}
                  key={key}
                  className="text-xl px-4 py-2 rounded-2xl text-center font-extrabold w-full  shadow-secondary shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
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
                className="text-2xl font-extrabold hover:underline decoration-4 underline-offset-8 transition-all duration-500"
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
          <MdAccountCircle className="h-16 w-16 md:h-20 md:w-20 text-[rgb(255,61,61)]" />
        </div>
        {profile && (
          <div className="absolute top-28 right-0 sm:w-96 z-50 w-[85%]  sm:h-44 bg-accent shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] p-5 rounded-2xl">
            <h2 className="text-xl font-bold">
              Hello ,{" "}
              {authStatus ? (
                authDetail?.username
              ) : (
                <span className="text-secondary">You need to login</span>
              )}
            </h2>
            {!authStatus ? (
              <LoginBtn className="my-5" setProfile={setProfile} />
            ) : (
              <LogoutBtn className="my-5" setProfile={setProfile} />
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
