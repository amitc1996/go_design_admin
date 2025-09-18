import User from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import { Op } from "sequelize";

const signup = async (data) => {
  const user = await User.create(data);
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    success: true,
    message: "Registration successful",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        is_active: user.is_active,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: "Bearer",
        expires_in: 1800,
      },
    },
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          is_active: user.is_active,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
        tokens: {
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: "Bearer",
          expires_in: 1800,
        },
      },
    };
  }
  throw new Error("Invalid email or password");
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const payload = require("jsonwebtoken").verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const accessToken = generateAccessToken(payload.id);
    return {
      success: true,
      message: "Access token refreshed",
      data: {
        tokens: {
          access_token: accessToken,
          token_type: "Bearer",
          expires_in: 1800,
        },
      },
    };
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendEmail(user.email, "Password Reset", `Reset here: ${resetUrl}`);

  return { success: true, message: "Password reset email sent" };
};

const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpire: { [Op.gt]: Date.now() },
    },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = newPassword;
  user.resetToken = null;
  user.resetTokenExpire = null;
  await user.save();

  return { success: true, message: "Password reset successful" };
};

export default { signup, login, forgotPassword, resetPassword, refreshAccessToken };
