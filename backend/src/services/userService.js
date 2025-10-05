import User from "../models/userModel.js";

const getUserByIdFull = async (id) => {
  return await User.findByPk(id);
};


const getUserById = async (id) => {
    return await User.findByPk(id,{
       attributes: { exclude: ["password", "reset_token", "new_email_token","reset_token_expire"] },
  });
};

const getProfile = async (id) => {
  return getUserById(id); 
};

const updateProfile = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  user.name = data.name || user.name;
  if (data.password) {
    user.password = data.password; // Let model hook hash it
  }

  await user.save();
  return user;
};

const updatePassword = async (id, oldPassword, newPassword) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  const isMatch = await user.matchPassword(oldPassword,'change_password');
  if (!isMatch) throw new Error("Old password is incorrect");
  user.password = newPassword; 
  await user.save();

  return user;
};

export default { getProfile,getUserByIdFull, updateProfile, updatePassword };
