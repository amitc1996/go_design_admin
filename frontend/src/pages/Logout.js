import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
    >
      <Typography variant="h6" color="primary">
        Logging out...
      </Typography>
    </Box>
  );
}

export default Logout;
