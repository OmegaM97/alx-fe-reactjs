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

export const searchUsers = async (query) => {
  const response = await githubApi.get(`/search/users?q=${query}`);
  return response.data;
};
