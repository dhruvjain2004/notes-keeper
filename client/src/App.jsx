import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import api from "./api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
  }, []);

  // Auth check
  useEffect(() => {
    if (token) {
      api.setAuthToken(token);
      localStorage.setItem("token", token);
      api
        .getProfile()
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
        });
    } else {
      api.setAuthToken(null);
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Notes Keeper
            </Link>
          </h1>
          <button className="btn-ghost" onClick={toggleTheme}>
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <nav>
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="welcome">Hi, {user?.name || "User"} 👋</span>
              <Link to="/">Notes</Link>
              <Link to="/profile">Profile</Link>
              <button className="btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} />}
          />
          <Route
            path="/register"
            element={<Register setToken={setToken} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute token={token}>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute token={token}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="footer">Built with ❤️ — Dhruv Jain 😉</footer>
    </div>
  );
}

function ProtectedRoute({ token, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  return token ? children : null;
}

export default App;
