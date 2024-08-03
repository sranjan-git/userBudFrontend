import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user profile");
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{user.name}</h1>
      <p className="text-gray-700 text-lg mb-4 text-center">{user.email}</p>
      <p className="text-gray-700 text-lg text-center">{user.bio}</p>
    </div>
  );
};

export default UserProfile;
