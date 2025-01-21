import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar fixed top-0 w-full z-10 flex items-center justify-between bg-blue-600 text-white px-4 py-2 shadow-md">
      {isAuthenticated && (
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          ☰
        </button>
      )}
      <div className="text-xl font-bold mx-auto">Chat App</div>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-300"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded transition duration-300"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
