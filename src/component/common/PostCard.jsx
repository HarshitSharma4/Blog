import React from "react";
import { Link } from "react-router-dom";
import service from "../../aapwrite/config";
import HTMLReactParser from "html-react-parser";
function PostCard({ $id, title, featureImage, content, name }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="md:h-80 h-full block my-5 bg-primary w-full md:flex gap-4 p-5 rounded-xl shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] hover:-translate-y-1 overflow-hidden "
    >
      <img
        className=" w-full md:h-[100%] md:w-[30rem] rounded-xl"
        src={service.getFilePreview(featureImage)}
        alt={`${title}`}
      />

      <div>
        <h1 className="text-2xl  font-bold md:mx-4 md:my-3 ">{title}</h1>
        <h2 className="text-xl font-semibold md:mx-4 md:my-3">{name}</h2>
        <p className="text-base font-semibold line-clamp-3 md:mx-4 md:my-3 h-16">
          {HTMLReactParser(content)}
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
