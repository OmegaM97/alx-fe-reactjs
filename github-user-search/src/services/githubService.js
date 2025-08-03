import axios from "axios";

const BASE_URL = "https://api.github.com";

const githubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

export const fetchUserData = async (username) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};
