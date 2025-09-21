import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import PageLayout from "pages/layouts/PageLayout";

import { createProject } from "api/project";

export default function CreateProject() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", description: "" },
  });

  const handleFormSubmit = async (data) => {
    try {
      await createProject(data);
      // Navigate to the project list on success, passing a success message
      navigate("/projects", { state: { successMessage: "Project created successfully!" } });
    } catch (err) {
      setError(err?.message || "Failed to create project");
    }
  };

  return (
    <PageLayout>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card>
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
              <MDTypography variant="h4" fontWeight="medium" color="white">
                Create New Project
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <MDBox mb={2}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Project name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Project Name"
                        variant="standard"
                        fullWidth
                        autoFocus
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        variant="standard"
                        fullWidth
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" type="submit" fullWidth>
                    Create Project
                  </MDButton>
                </MDBox>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
      <MDSnackbar
        color="error"
        icon="warning"
        title="Error"
        content={error}
        open={Boolean(error)}
        onClose={() => setError("")}
        close={() => setError("")}
      />
    </PageLayout>
  );
}
