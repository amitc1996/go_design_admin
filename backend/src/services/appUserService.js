import AppUser from "../models/appUserModel.js";

/**
 * Get all application users.
 * @returns {Promise<AppUser[]>}
 */
const getAllUsers = async () => {
  return await AppUser.findAll({
    attributes: { exclude: ["password", "reset_token", "new_email_token"] },
  });
};

/**
 * Get a single user by their ID.
 * @param {number} id - The user's ID.
 * @returns {Promise<AppUser>}
 */
const getUserById = async (id) => {
  const user = await AppUser.findByPk(id, {
    attributes: { exclude: ["password", "reset_token", "new_email_token"] },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export default {
  getAllUsers,
  getUserById,
};