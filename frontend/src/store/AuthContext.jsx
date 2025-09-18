import React, { createContext, useContext, useReducer, useEffect } from "react";
import { tokenStorage } from "../utils/token";
import api from "../services/api";
import * as authApi from "../api/auth";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = { user: null, loading: true, isAuthenticated: false };

function authReducer(state, action) {
  switch (action.type) {
    case "BOOT":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        loading: false,
      };
    case "LOGIN":
      return { ...state, user: action.payload.user, isAuthenticated: true, loading: false };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      throw new Error("Unhandled action " + action.type);
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = tokenStorage.getToken();
    if (!token) {
      dispatch({ type: "BOOT", payload: { user: null } });
      return;
    }
    api
      .get("/auth/me")
      .then((res) => dispatch({ type: "BOOT", payload: { user: res.data.user } }))
      .catch(() => {
        tokenStorage.removeToken();
        tokenStorage.removeRefresh();
        dispatch({ type: "BOOT", payload: { user: null } });
      });
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const ctx = useContext(AuthStateContext);
  if (ctx === undefined) throw new Error("useAuthState must be used within AuthProvider");
  return ctx;
}

export function useAuthDispatch() {
  const ctx = useContext(AuthDispatchContext);
  if (ctx === undefined) throw new Error("useAuthDispatch must be used within AuthProvider");
  return ctx;
}

export async function login(dispatch, { email, password, remember = true }) {
  const user = await authApi.login({ email, password, remember });
  dispatch({ type: "LOGIN", payload: { user } });
  return user;
}

export async function register(dispatch, { name, email, password }) {
  const data = await authApi.register({ name, email, password });
  // Optionally, you can dispatch login or other actions here
  return data;
}

export async function forgotPassword(dispatch, { email }) {
  const data = await authApi.forgotPassword({ email });
  return data;
}

export async function resetPassword(dispatch, { token, password }) {
  const data = await authApi.resetPassword({ token, password });
  return data;
}

export async function logout(dispatch) {
  // Optionally, call backend to invalidate refresh token
  // await api.post('/auth/logout');
  tokenStorage.removeToken();
  tokenStorage.removeRefresh();
  dispatch({ type: "LOGOUT" });
}
