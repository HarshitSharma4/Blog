import React from "react";
import { useSelector } from "react-redux";
import { Button, Container, Navigation } from "../component/index.js";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
import service from "../aapwrite/config.js";
import MyPost from "./MyPost.jsx";
function Profile() {
  const user = useSelector((state) => state.auth.profile);
  return (
    <Container>
      <Navigation />
      <div className="border-2 my-5 bg-primary py-7 px-5 flex items-center flex-col border-text shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] relative rounded-2xl">
        <img
          className="my-10 h-80 w-56 rounded-xl block"
          src={service.getFilePreview(user?.Avatar)}
          alt="Profile image"
        />
        <div className="space-y-7 my-5">
          <h1 className="text-center text-2xl font-bold">{user?.username}</h1>
          <p className="text-center font-semibold text-xl">
            {user?.discription}
          </p>
          <h2 className="text-center text-xl font-semibold">
            Email : {user?.email}
          </h2>
        </div>
        <div className="w-[95%] mt-7 mb-3">
          <h1 className="text-center text-3xl font-extrabold">My Blogs</h1>
          <MyPost />
        </div>
        <div className="flex gap-7 absolute md:top-10 md:right-10 top-5 right-5">
          <Link to={`/profile/${user?.$id}`}>
            <Button className="bg-text">
              <FaPencil className="text-accent md:text-2xl text-base" />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
