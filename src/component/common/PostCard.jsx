import React from "react";
import { Link } from "react-router-dom";
import service from "../../aapwrite/config";
import HTMLReactParser from "html-react-parser";
function PostCard({ $id, title, featureImage, content }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="h-[28rem] bg-accent w-full rounded-lg shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)] hover:-translate-y-1 overflow-hidden "
    >
      <div>
        <img
          className="h-72 w-full rounded-lg"
          src={service.getFilePreview(featureImage)}
          alt={`${title}`}
        />
      </div>
      <h1 className="text-2xl font-bold mx-4 my-3">{title}</h1>
      <p className="text-base font-semibold line-clamp-3 mx-4 my-3">
        {HTMLReactParser(content)}
      </p>
    </Link>
  );
}

export default PostCard;
