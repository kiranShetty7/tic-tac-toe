import React from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-4xl font-bold mb-2 text-black">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8 text-base max-w-md mx-auto">
        Oops! Looks like you took a wrong turn. The page you are looking for
        doesn't exist.
      </p>
      {/* Game-like Board */}
      <div className="grid grid-cols-3 gap-2 w-fit mx-auto my-8">
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">
          X
        </div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">
          O
        </div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">
          X
        </div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">
          O
        </div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold relative">
          <span className="absolute left-0 right-0 top-1/2 border-t-4 border-pink-500 w-full transform -translate-y-1/2"></span>
          X
        </div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold"></div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">
          O
        </div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">
          X
        </div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">
          O
        </div>
      </div>
      <Button className="mt-4" onClick={() => (window.location.href = "/")}>
        Back to Home
      </Button>
      <Footer />
    </div>
  );
};

export default NotFound;
