import User from "../models/userModel.js";

const getProfile = async (id) => {
  return await User.findByPk(id, { attributes: { exclude: ["password"] } });
};

const updateProfile = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  user.name = data.name || user.name;
  if (data.password) user.password = data.password;

  await user.save();
  return user;
};

export default { getProfile, updateProfile };
