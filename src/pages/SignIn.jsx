import React, { useState } from "react";
import { Button, Input, Logo } from "../component/index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import authService from "../aapwrite/Auth";
function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.createAcount(data);
      if (session) {
        const userdata = await authService.getCurrentUser();
        if (userdata) dispatch(authLogin(userdata));
        reset();
        navigate("/");
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <div className="w-screen h-screen flex  justify-center md:pt-11 ">
      <div className="w-full h-full md:w-[45%] md:h-[85%] shadow-lg shadow-secondary md:rounded-lg bg-accent p-5 flex items-center flex-col ">
        <div className="h-20 w-20 ">
          <Logo />
        </div>
        <h1 className="text-xl font-bold text-center">Create New Acount</h1>
        {error && <h1 className="text-primary mt-6 text-center">{error}</h1>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5  flex flex-col items-center justify-center">
            <Input
              label="Name : "
              placeholder="Enter your Name"
              type="text"
              {...register("Name", {
                required: true,
              })}
            />
            <Input
              label="Email : "
              placeholder="Enter Your Email"
              type="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors.email && (
              <span className=" text-primary text-base font-semibold">
                {errors.email.message}
              </span>
            )}
            <Input
              label="Password : "
              type="password"
              className=""
              placeholder="Enter Your Password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~])(.{8,})$/,
                  message:
                    "password should have  minimum length of 8 characters, at least one special character, and at least one uppercase and one lowercase letter",
                },
              })}
            />
            {errors.password && (
              <span className=" text-primary text-base w-[25rem] font-semibold">
                {errors.password.message}
              </span>
            )}
            <Button type="submit" className="px-16">
              Sign In
            </Button>
          </div>
        </form>
        <hr className="w-full my-5" />
        <p>Do have an acount?</p>
        <Link to="/login">
          <Button className="px-16">Log In </Button>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;
