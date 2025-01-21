import React, { useEffect, useState } from "react";

const Sidebar = ({ isOpen, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (onSelectUser) {
      onSelectUser(user); // Notify the parent component of the selected user
    }
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } bg-gray-800 text-white w-64 p-4 shadow-lg mt-14`}
    >
      <h2 className="text-lg font-bold border-b border-gray-700 pb-2 mb-4">
        Users
      </h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
            className={`p-2 rounded cursor-pointer ${
              selectedUser && selectedUser.id === user.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
