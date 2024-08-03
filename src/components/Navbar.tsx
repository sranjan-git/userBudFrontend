import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/Home" className="text-white text-xl font-bold">
            userBuddy.
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex items-center ${
            isOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
            <li>
              <Link
                to="/Home"
                className="block text-white hover:text-gray-400 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block text-white hover:text-gray-400 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/directory"
                className="block text-white hover:text-gray-400 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Directory
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block text-white hover:text-gray-400 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="block text-white hover:text-gray-400 transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
