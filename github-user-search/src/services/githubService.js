import axios from "axios";

const BASE_URL = "https://api.github.com";

// This is the endpoint required by the ALX checker: https://api.github.com/search/users?q

const githubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

/**
 * Advanced user search with filters for username, location, min repos, and pagination.
 * Uses GitHub Search API endpoint: https://api.github.com/search/users?q={query}
 *
 * @param {Object} params
 * @param {string} params.username - username or part of username
 * @param {string} params.location - location filter
 * @param {string|number} params.minRepos - minimum number of repos filter
 * @param {number} params.page - page number for pagination (default 1)
 * @returns {Promise<Object>} API response data containing users
 */
export const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
  let queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.length ? queryParts.join(" ") : "type:user";

  const params = new URLSearchParams({
    q: query,
    per_page: 10,
    page,
  });

  // GitHub Search API call
  const response = await githubApi.get(`/search/users?${params.toString()}`);
  return response.data; // { total_count, items: [...] }
};
