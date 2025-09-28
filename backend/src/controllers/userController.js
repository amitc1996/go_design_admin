import userService from "../services/userService.js";

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    if (!id || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "ID, old password, and new password are required" });
    }

    const updatedUser = await userService.updatePassword(id, oldPassword, newPassword);

    res.json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating password:", error.message);
    const status = error.message === "Old password is incorrect" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};
