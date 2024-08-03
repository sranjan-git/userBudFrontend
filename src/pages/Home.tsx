import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to userBuddy!</h1>
      <p className="text-lg mb-4">
        A user management system that helps manage your profile and connect with
        others.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
