import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Box, Grid } from "@mui/material";

export default function Wallet() {
  const [balance, setBalance] = useState(10);
  const [amount, setAmount] = useState("");
  const userId = 1;

  const fetchBalance = async () => {
    const res = await axios.get(`http://localhost:5000/api/wallet/balance/${userId}`);
    setBalance(res.data.balance);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const rechargeWallet = async () => {
    try {
      // Step 1: Call backend to create order
      const res = await axios.post("http://localhost:5000/api/wallet/recharge", {
        amount,
        userId,
      });

      const { success, order } = res.data;
      if (!success) {
        alert("Failed to create order");
        return;
      }

      // Step 2: Load Razorpay SDK
      const loaded = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
      if (!loaded) return alert("Failed to load Razorpay SDK");

      // Step 3: Configure checkout
      const options = {
        key: "rzp_test_R9WNEHG3V1bTm1", // 🔹 put your Razorpay Key ID (better: return from backend)
        amount: order.amount, // already in paise from backend
        currency: order.currency,
        name: "My Wallet",
        description: "Wallet Recharge",
        order_id: order.id, // Razorpay order ID
        handler: async (response) => {
          console.log("Payment success:", response);

          // Step 4: Verify payment with backend
          await axios.post("http://localhost:5000/api/wallet/verify", {
            orderId: order.id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: order.amount / 100, // convert back to INR
            userId,
          });

          fetchBalance(); // refresh balance
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 5: Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Recharge failed:", error);
      alert("Something went wrong while recharging wallet.");
    }
  };

  const makePurchase = async () => {
    try {
      await axios.post("http://localhost:5000/api/wallet/purchase", { userId, amount: 100 });
      fetchBalance();
      alert("Purchase successful!");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ minWidth: 400, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            Wallet
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Balance: ₹{balance}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Recharge Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={rechargeWallet}>
                Recharge Wallet
              </Button>
            </Grid>
            {/* <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={makePurchase}>
                Make Purchase (₹100)
              </Button>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
