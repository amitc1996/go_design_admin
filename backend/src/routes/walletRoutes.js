import express from "express";
import {
  createOrder,
  verifyPayment,
  getWalletBalance,
  approveQuotation,
  getTransactions,
} from "../controllers/walletController.js";

const router = express.Router();

router.post("/recharge", createOrder);
router.post("/verify", verifyPayment);
router.get("/balance/:userId", getWalletBalance);
router.post("/approve-quotation", approveQuotation);
router.get("/transactions/:userId", getTransactions);

export default router;
