import React, { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types"; // 👈 import this
import { tokenStorage } from "../utils/token";
import api from "../services/api";
import * as authApi from "../api/auth";

// ... rest of your code

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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
