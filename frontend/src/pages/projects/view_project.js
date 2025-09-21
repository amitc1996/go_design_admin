import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import PageLayout from "pages/layouts/PageLayout";

import { getProject } from "api/project";

export default function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // NOTE: This relies on the `getProject(id)` function in your api/project.js file.
        const data = await getProject(id);
        setProject(data);
      } catch (err) {
        setError(err?.message || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  return (
    <PageLayout>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card>
            <MDBox p={3}>
              {loading && (
                <MDBox display="flex" justifyContent="center">
                  <CircularProgress />
                </MDBox>
              )}
              {error && (
                <MDTypography color="error" textAlign="center">
                  {error}
                </MDTypography>
              )}
              {project && (
                <>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <MDTypography variant="h5">{project.name}</MDTypography>
                    <MDButton
                      component={Link}
                      to={`/projects/edit/${project.id}`}
                      variant="outlined"
                      color="info"
                      size="small"
                    >
                      Edit
                    </MDButton>
                  </MDBox>
                  <MDTypography variant="body2" color="text">
                    {project.description}
                  </MDTypography>
                  <hr />
                  <MDTypography variant="caption" color="text" fontWeight="light">
                    ID: {project.id}
                  </MDTypography>
                </>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
