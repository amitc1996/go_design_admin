import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import PageLayout from "pages/layouts/PageLayout";

import { listUsers, updatePassword } from "api/profile";
import { useForm } from "react-hook-form";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch users
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const data = await listUsers();
        if (isMounted) {
          setUsers(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (err) {
        if (isMounted) setError(err?.message || "Failed to load users");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  // Change password form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onChangePassword = async (data) => {
    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      setSuccess("Password updated successfully!");
      reset();
    } catch (err) {
      setError(err?.message || "Failed to update password");
    }
  };

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" mb={2}>
                Change Password
              </MDTypography>
              <form onSubmit={handleSubmit(onChangePassword)}>
                <MDBox mb={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Old Password"
                    {...register("oldPassword", { required: "Old password is required" })}
                    error={Boolean(errors.oldPassword)}
                    helperText={errors.oldPassword?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    {...register("confirmPassword", {
                      required: "Please confirm new password",
                      validate: (val, values) =>
                        val === values.newPassword || "Passwords do not match",
                    })}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                  />
                </MDBox>
                <MDBox display="flex" justifyContent="flex-end">
                  <MDButton type="submit" variant="gradient" color="info">
                    Update Password
                  </MDButton>
                </MDBox>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbars */}
      <MDSnackbar
        color="error"
        icon="warning"
        title="Error"
        content={error}
        open={Boolean(error)}
        onClose={() => setError("")}
        close={() => setError("")}
        dateTime=""
      />
      <MDSnackbar
        color="success"
        icon="check"
        title="Success"
        content={success}
        open={Boolean(success)}
        onClose={() => setSuccess("")}
        close={() => setSuccess("")}
        dateTime=""
      />
    </PageLayout>
  );
}
