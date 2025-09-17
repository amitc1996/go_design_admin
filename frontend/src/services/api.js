import axios from "axios";
import { CONFIG } from "../configs";
import { tokenStorage } from "../utils/token";

const api = axios.create({ baseURL: CONFIG.API_BASE, timeout: CONFIG.TIMEOUT });

api.interceptors.request.use((cfg) => {
  const token = tokenStorage.getToken();
  if (token) cfg.headers = { ...cfg.headers, Authorization: `Bearer ${token}` };
  return cfg;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (err, token = null) => {
  failedQueue.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenStorage.getRefresh();
      if (!refreshToken) {
        isRefreshing = false;
        return Promise.reject(err);
      }

      return new Promise((resolve, reject) => {
        axios
          .post(`${CONFIG.API_BASE}/auth/refresh`, { refresh_token: refreshToken })
          .then(({ data }) => {
            const newToken = data.access_token;
            tokenStorage.setToken(newToken);
            api.defaults.headers.common["Authorization"] = "Bearer " + newToken;
            processQueue(null, newToken);
            resolve(api(originalRequest));
          })
          .catch((e) => {
            processQueue(e, null);
            tokenStorage.removeToken();
            tokenStorage.removeRefresh();
            reject(e);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(err);
  }
);

export default api;
