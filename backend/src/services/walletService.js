import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

const razorpay = new Razorpay({
  key_id:'rzp_test_R9WNEHG3V1bTm1',
  key_secret:'oyNSVMGFZ0nA7GLyGJLGdJTX',
});

const createOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `wallet_recharge_${Date.now()}`,
  };
  console.log('options as',options)
  return await razorpay.orders.create(options);
};

const verifyPayment = async ({ orderId, paymentId, signature, userId, amount }) => {
  const sign = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(orderId + "|" + paymentId)
    .digest("hex");
  if (sign !== signature) {
    throw new Error("Payment verification failed");
  }
  const user = await User.findByPk(userId);
  console.log('user is',user)
   user.wallet_balance += amount;
   await user.save();
  // await Transaction.create({
  //   userId,
  //   type: "CREDIT",
  //   amount,
  //   description: "Wallet recharge",
  // });
  //return user.wallet_balance;
};

const getWalletBalance = async (userId) => {
  const user = await User.findByPk(userId);
  console.log('user is',user)
  return user.wallet_balance;
};

const approveQuotation = async (userId, amount) => {
  const user = await User.findByPk(userId);
  if (user.wallet_balance < amount) {
    throw new Error("Insufficient balance");
  }
  user.wallet_balance -= amount;
  await user.save();
  await Transaction.create({
    userId,
    type: "DEBIT",
    amount,
    description: "Quotation approved, order placed",
  });
  return user.wallet_balance;
};

const getTransactions = async (userId) => {
  return await Transaction.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

export default {
  createOrder,
  verifyPayment,
  getWalletBalance,
  approveQuotation,
  getTransactions,
};
