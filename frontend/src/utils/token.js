import { CONFIG } from "../configs";

export const tokenStorage = {
  setToken: (token) => {
    localStorage.setItem(CONFIG.TOKEN_KEY, token);
  },
  getToken: () =>
    localStorage.getItem(CONFIG.TOKEN_KEY) || sessionStorage.getItem(CONFIG.TOKEN_KEY),
  removeToken: () => {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    sessionStorage.removeItem(CONFIG.TOKEN_KEY);
  },
  setRefresh: (token) => localStorage.setItem(CONFIG.REFRESH_KEY, token),
  getRefresh: () => localStorage.getItem(CONFIG.REFRESH_KEY),
  removeRefresh: () => localStorage.removeItem(CONFIG.REFRESH_KEY),
};
