import React from "react";
import { Link } from "react-router-dom";
import blog from "../../assets/blog1.png";
import { FaPlus } from "react-icons/fa";
function AddPostBar() {
  return (
    <div className="my-7 mb-10">
      <Link to="/add-blog">
        <div className="py-3 items-center justify-start rounded-2xl w-full flex gap-5  bg-primary shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] hover:-translate-y-1 ">
          <img
            src={blog}
            alt="blog icon"
            className="h-14 w-16 ml-4 md:ml-12 "
          />
          <h1 className="text-text font-semibold text-xl md:text-2xl">
            Write your Blog today . . .{" "}
          </h1>
        </div>
      </Link>
      <Link to="/add-blog" className="fixed bottom-5 right-5 md:hidden z-20">
        <div className="rounded-[100%] p-1 shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] bg-primary flex items-center justify-center  hover:-translate-y-1 ">
          <FaPlus className="h-14 w-14 text-accent" />
        </div>
      </Link>
    </div>
  );
}

export default AddPostBar;
