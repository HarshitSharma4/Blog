import React, { useState } from "react";
import { Button, Input } from "../component";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../aapwrite/config";
import { updateProfile } from "../store/authSlice";

function ProfileForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.profile);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: userProfile?.username || "",
      email: userProfile?.email || "",
      avatar: userProfile?.Avatar || "",
      discription: userProfile?.discription || "",
    },
  });
  const [error, setError] = useState("");
  const editUser = async (data) => {
    setError("");
    try {
      console.log("start", data.image);
      let file = false;
      console.log(data.image?.length);
      if (data.image?.length) file = await service.uploadFile(data.image[0]);
      console.log(file);
      if (file) service.deleteFile(userProfile.Avatar);
      console.log(file);
      const createProfile = await service.updateProfile(userProfile.$id, {
        ...data,
        Avatar: file ? file?.$id : userProfile.Avatar,
      });
      console.log(createProfile);
      if (createProfile) {
        const profile = await service.getProfile(data.email);
        if (profile) dispatch(updateProfile(profile));
        navigate("/profile");
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <div className="flex  justify-center  ">
      <div className="w-full h-full   shadow-lg shadow-secondary md:rounded-lg  p-5 flex items-center justify-center flex-col ">
        <h1 className="text-2xl font-bold text-center">Update your profile</h1>
        {error && <h1 className="text-primary mt-6 text-center">{error}</h1>}
        <form onSubmit={handleSubmit(editUser)} className="mt-8">
          <div className="space-y-5  flex flex-col  justify-center">
            <Input
              label="Name :"
              placeholder="Enter your Name"
              type="text"
              {...register("username", {
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
              label="Discription :"
              type="textarea"
              placeholder="enter your discrioption(optional)"
              className=""
              {...register("discription", {})}
            />
            <Input
              label="Aatar: "
              type="file"
              placeholder="profile"
              accept="image/png , image/jpg, image/jpeg, image/gif"
              divClass="flex gap-7"
              className="w-auto"
              {...register("Avatar", { required: !userProfile })}
            />
            <div>
              <img
                src={service.getFilePreview(userProfile.Avatar)}
                alt="profile"
              />
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" className="px-16">
                Change Your Profile
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
