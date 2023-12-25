import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="w-full h-screen text-center pt-10">
      <h1 className="text-2xl font-bold">Sorry,This page does not exist</h1>
      <Link to="/" className="text-base text-accent">
        Go back to Home ?
      </Link>
    </div>
  );
}

export default Error;
