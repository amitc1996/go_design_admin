
import walletService from "../services/walletService.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await walletService.createOrder(amount);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const balance = await walletService.verifyPayment(req.body);
    res.json({ success: true, message: "Wallet recharged successfully", balance });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getWalletBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const balance = await walletService.getWalletBalance(userId);
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveQuotation = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const balance = await walletService.approveQuotation(userId, amount);
    res.json({ success: true, message: "Order placed successfully", balance });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await walletService.getTransactions(userId);
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
