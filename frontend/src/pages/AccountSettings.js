import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function AccountSettings() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ minWidth: 350, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            Account Settings
          </Typography>
          <Typography variant="body2">Update your account details here.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AccountSettings;
