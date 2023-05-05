import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full min-h-screen">
      <h1 className="text-4xl text-primary">Page Not Found</h1>
      <Link
        to="/"
        className="p-2 rounded-lg mt-2 bg-primary text-white text-md md:text-lg"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
