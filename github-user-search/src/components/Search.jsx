import React, { useState } from "react";
import { searchUsersAdvanced } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);
    setPage(1);

    try {
      const data = await searchUsersAdvanced({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos.trim(),
        page: 1,
      });
      setUsers(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    setError(null);

    try {
      const data = await searchUsersAdvanced({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos.trim(),
        page: nextPage,
      });
      setUsers((prevUsers) => [...prevUsers, ...data.items]);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
        aria-label="GitHub User Advanced Search Form"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Username"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Location"
        />
        <input
          type="number"
          min="0"
          placeholder="Min Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Minimum Repositories"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          aria-label="Search Users"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p className="text-red-600 mb-4" role="alert">
          {error}
        </p>
      )}

      {!loading && users.length === 0 && !error && (
        <p className="text-gray-600">No users found. Try different criteria.</p>
      )}

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-4 border rounded p-4 shadow hover:shadow-md transition-shadow"
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-16 h-16 rounded-full"
              loading="lazy"
            />
            <div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold underline"
              >
                {user.login}
              </a>
              {/* Display additional user info - note the Search API returns limited user info */}
              {/* You could fetch detailed info per user if needed */}
            </div>
          </li>
        ))}
      </ul>

      {users.length > 0 && users.length < totalCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
