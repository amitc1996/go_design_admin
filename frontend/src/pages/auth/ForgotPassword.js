import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";

import api from "services/api"; // your axios instance
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import logoImage from "assets/images/logo.png";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/forgot-password", { email: data.email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        {/* Header */}
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDBox display="flex" justifyContent="center" mb={1}>
            <img src={logoImage} alt="Brand Logo" style={{ width: "100px" }} />
          </MDBox>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            Forgot Password
          </MDTypography>
        </MDBox>

        {/* Body */}
        <MDBox pt={4} pb={3} px={3}>
          {!sent ? (
            <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <MDTypography variant="caption" color="error">
                    {errors.email.message}
                  </MDTypography>
                )}
              </MDBox>

              {error && (
                <MDBox mb={2}>
                  <Alert severity="error">{error}</Alert>
                </MDBox>
              )}

              <MDBox mt={4} mb={1}>
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </MDButton>
              </MDBox>

              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/login"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Back to sign in
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          ) : (
            <MDBox textAlign="center">
              <MDTypography variant="h5" fontWeight="medium" mb={2}>
                Check your email
              </MDTypography>
              <Alert severity="success">We’ve sent a password reset link to your email.</Alert>
              <MDBox mt={3}>
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Back to sign in
                </MDTypography>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ForgotPassword;
