import React from "react";
import { Link } from "react-router-dom";
import blog from "../../assets/blog.png";
import plus from "../../assets/add.png";
function AddPostBar() {
  return (
    <div className="my-5 mb-10">
      <Link to="/add-blog">
        <div className="py-3 items-center justify-center rounded-3xl w-full flex gap-5 border border-accent shadow-lg hover:-translate-y-1 hover:shadow-2xl">
          <img
            src={blog}
            alt="blog icon"
            className="h-12 w-12 rounded-[100%]"
          />
          <h1 className="text-primary font-semibold text-xl">Add your Blog</h1>
        </div>
      </Link>
      <Link to="/add-blog" className="fixed bottom-5 right-5 md:hidden z-20">
        <div className="rounded-[100%] shadow-lg hover:-translate-y-1 hover:shadow-2xl">
          <img
            src={plus}
            alt="blog icon"
            className="h-16 w-16 rounded-[100%]"
          />
        </div>
      </Link>
    </div>
  );
}

export default AddPostBar;
