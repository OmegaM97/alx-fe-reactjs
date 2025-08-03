import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { searchUsers } from "./services/githubApi";
import Search from "./components/Search";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchUsers(query);
      setUsers(data.items);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {user.login}
              </a>
              <p>ID: {user.id}</p>
            </div>
          </li>
        ))}
      </ul>

      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>GitHub User Search</h1>
      <Search />
    </div>
  );
};

export default App;
