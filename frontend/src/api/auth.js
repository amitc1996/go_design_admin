import api from "../services/api";
import { tokenStorage } from "../utils/token";

export async function login({ email, password, remember = true }) {
  const res = await api.post("/auth/login", { email, password });
  const { user, tokens } = res.data.data;
  tokenStorage.setToken(tokens.access_token, { remember });
  if (tokens.refresh_token) tokenStorage.setRefresh(tokens.refresh_token);

  return user;
}

export async function register({ name, email, password, username }) {
  const res = await api.post("/auth/register", { name, email, password, username });
  const { user, tokens } = res.data.data;
  tokenStorage.setToken(tokens.access_token, { remember: true });
  if (tokens.refresh_token) tokenStorage.setRefresh(tokens.refresh_token);

  return user;
}

export async function forgotPassword({ email }) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}

export async function resetPassword({ token, password }) {
  const res = await api.post("/auth/reset-password", { token, password });
  return res.data;
}

export async function refreshToken() {
  const refreshToken = tokenStorage.getRefresh();
  const res = await api.post("/auth/refresh-token", { refreshToken });
  const { tokens } = res.data.data;

  tokenStorage.setToken(tokens.access_token, { remember: true });
  return tokens.access_token;
}
