import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import PageLayout from "pages/layouts/PageLayout";

import { useForm } from "react-hook-form";
import { createProject } from "api/project";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "", base_price: "", description: "" },
  });

  const onCreateProject = async (data) => {
    try {
      await createProject(data);
      setSuccess("Project created successfully!");
      reset();
      navigate("/projects", { state: { successMessage: "Project created successfully!" } });
    } catch (err) {
      setError(err?.message || "Failed to create project");
    }
  };

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" mb={2}>
                Create New Project
              </MDTypography>
              <form onSubmit={handleSubmit(onCreateProject)}>
                {/* Project Name and Base Price on same line */}
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Project Name"
                      {...register("name", { required: "Project name is required" })}
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Base Price"
                      type="number"
                      {...register("base_price", { required: "Base price is required" })}
                      error={Boolean(errors.base_price)}
                      helperText={errors.base_price?.message}
                    />
                  </Grid>
                </Grid>

                {/* Description */}
                <MDBox mb={2}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    {...register("description")}
                  />
                </MDBox>

                <MDBox display="flex" justifyContent="flex-end">
                  <MDButton type="submit" variant="gradient" color="info">
                    Create Project
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
      />
      <MDSnackbar
        color="success"
        icon="check"
        title="Success"
        content={success}
        open={Boolean(success)}
        onClose={() => setSuccess("")}
        close={() => setSuccess("")}
      />
    </PageLayout>
  );
}
