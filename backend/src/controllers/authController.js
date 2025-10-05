import { success, errors } from "../utils/response.js";
import authService from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    const resp = success(
      { status: 201, data: user, statusText: "Created" },
      "User registered successfully."
    );
    res.status(201).json(resp);
  } catch (error) {
    const resp = errors(error, "Failed to register user");
    res.status(resp.status || 400).json(resp);
  }
};

export const login = async (req, res) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    const resp = success(
      { status: 200, data: user, statusText: "OK" },
      "Login successful."
    );
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, "Invalid login credentials");
    res.status(resp.status || 400).json(resp);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    const resp = success(
      { status: 200, data: result, statusText: "OK" },
      "Password reset email sent successfully."
    );
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, "Failed to send reset password email");
    res.status(resp.status || 400).json(resp);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body.token, req.body.password);
    const resp = success(
      { status: 200, data: result, statusText: "OK" },
      "Password reset successfully."
    );
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, "Failed to reset password");
    res.status(resp.status || 400).json(resp);
  }
};
