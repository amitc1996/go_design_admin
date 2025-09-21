import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import PageLayout from "pages/layouts/PageLayout";

import { getProject, updateProject } from "api/project";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // NOTE: You will need to add a `getProject(id)` function to your `api/project.js` file.
        const project = await getProject(id);
        setValue("name", project.name);
        setValue("description", project.description);
      } catch (err) {
        setError(err?.message || "Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      await updateProject(id, data);
      navigate("/projects", { state: { successMessage: "Project updated successfully!" } });
    } catch (err) {
      setError(err?.message || "Failed to update project");
    }
  };

  return (
    <PageLayout>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card>
            <MDBox p={3} borderBottom="1px solid rgba(0, 0, 0, 0.1)">
              <MDTypography variant="h5">Edit Project</MDTypography>
            </MDBox>
            {loading ? (
              <MDBox p={3} display="flex" justifyContent="center">
                <CircularProgress />
              </MDBox>
            ) : (
              <MDBox pt={2} pb={3} px={3}>
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
                      Save Changes
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            )}
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
