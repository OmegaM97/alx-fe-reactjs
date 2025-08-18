import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Post from "./components/Post";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>
          Home
        </Link>
        <Link to="/profile" style={{ marginRight: 10 }}>
          Profile
        </Link>
        <Link to="/post/123" style={{ marginRight: 10 }}>
          Sample Post
        </Link>
        <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />

        {/* Protected route */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic route */}
        <Route path="/post/:id" element={<Post />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
