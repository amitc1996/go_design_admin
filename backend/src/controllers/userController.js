import userService from "../services/userService.js";
import { success, errors } from "../utils/response.js";

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    const resp = success(
      { status: 200, data: user, statusText: "OK" },
      "User profile fetched successfully."
    );
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, "Failed to fetch user profile");
    res.status(resp.status || 400).json(resp);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    const resp = success(
      { status: 200, data: user, statusText: "OK" },
      "User profile updated successfully."
    );
    res.status(200).json(resp);
  } catch (error) {
    const resp = errors(error, "Failed to update user profile");
    res.status(resp.status || 400).json(resp);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    if (!id || !oldPassword || !newPassword) {
      const resp = errors(
        new Error("Old password, and new password are required"),
        "Missing required fields"
      );
      return res.status(resp.status || 400).json(resp);
    }

    const updatedUser = await userService.updatePassword(id, oldPassword, newPassword);

    const resp = success(
      { status: 200, data: updatedUser, statusText: "OK" },
      "Password updated successfully."
    );
    res.status(200).json(resp);
  } catch (error) {
    console.error("Error updating password:", error.message);
    const status = error.message === "Old password is incorrect" ? 400 : 500;
    const resp = errors(error, "Failed to update password");
    res.status(status).json(resp);
  }
};
