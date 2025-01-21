import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // Added state for selected user

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex flex-1">
          {isAuthenticated && (
            <Sidebar
              isOpen={sidebarOpen}
              onSelectUser={setSelectedUser} // Pass the setSelectedUser function
              className="bg-gray-800 text-white w-64 p-4"
            />
          )}
          <div className="flex-1 p-4">
            <Routes>
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  ) : (
                    <Navigate to="/chat" />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  !isAuthenticated ? (
                    <Register setIsAuthenticated={setIsAuthenticated} />
                  ) : (
                    <Navigate to="/chat" />
                  )
                }
              />
              <Route
                path="/chat"
                element={
                  isAuthenticated ? (
                    <Chat selectedUser={selectedUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/" element={<Navigate to="/chat" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
