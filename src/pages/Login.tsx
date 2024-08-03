import React, { useState } from "react";
import api from "../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      const response = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true); // Set login status to true
      alert("Login successful");
      setError("");
    } catch (error) {
      setError("Error logging in");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Set login status to false
    alert("Logout successful");
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isLoggedIn ? "Logout" : "Login"}
      </h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form
        onSubmit={isLoggedIn ? handleLogout : handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {!isLoggedIn && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
