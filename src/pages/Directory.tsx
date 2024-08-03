import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
}

const Directory: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      setError("");
      const response = await api.get(`/api/users/${email}`);
      setResult(response.data);
    } catch (err) {
      setError("User not found or there was an error.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        User Directory
      </h1>

      {/* Search Form */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Search by email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline w-full"
        >
          Search
        </button>
      </form>

      {result && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-xl text-center font-bold mb-4">User Information</h3>
          <p className="font-bold text-lg">{result.name}</p>
          <p className="text-sm text-gray-600">{result.email}</p>
          <p className="text-sm text-gray-600">{result.bio}</p>
          <p className="text-sm">{result.bio}</p>
        </div>
      )}
    </div>
  );
};

export default Directory;
