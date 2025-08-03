import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
    } catch (err) {
      setError("Looks like we can't find the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 400, margin: "2rem auto" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "0.5rem", width: "100%" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginTop: "0.5rem" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>Looks like we cant find the user</p>}

      {userData && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img
            src={userData.avatar_url}
            alt={userData.login}
            width={80}
            height={80}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              {userData.name || userData.login}
            </a>
            <p>Username: {userData.login}</p>
            {userData.bio && <p>Bio: {userData.bio}</p>}
            {userData.location && <p>Location: {userData.location}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
