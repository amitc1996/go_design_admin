import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";
import PageLayout from "pages/layouts/PageLayout";
import DataTable from "examples/Tables/DataTable";

import { listProjects, deleteProject } from "api/project";

export default function ProjectListing() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from redirects (e.g., after create/edit)
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccess(location.state.successMessage);
      // Clear the location state to prevent the message from re-appearing on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await listProjects();
      setProjects(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      setError(err?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
        setSuccess("Project deleted successfully!");
        await fetchProjects(); // Refresh the list
      } catch (err) {
        setError(err?.message || "Failed to delete project");
      }
    }
  };

  const columns = [
    { Header: "Name", accessor: "name", width: "30%" },
    { Header: "Base Price", accessor: "base_price" },
    {
      Header: "Actions",
      accessor: "actions",
      sortable: false,
      align: "center",
    },
  ];

  const rows = projects.map((p) => ({
    id: p.id,
    name: p.name,
    base_price: p.base_price,
    actions: (
      <MDBox>
        <IconButton component={Link} to={`/projects/view/${p.id}`} title="View Project">
          <VisibilityIcon />
        </IconButton>
        <IconButton
          component={Link}
          to={`/projects/edit/${p.id}`}
          color="info"
          title="Edit Project"
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(p.id)} color="error" title="Delete Project">
          <DeleteIcon />
        </IconButton>
      </MDBox>
    ),
  }));

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="flex-end" mb={2}>
            <MDButton variant="gradient" color="info" onClick={() => navigate("/projects/create")}>
              + Create Project
            </MDButton>
          </MDBox>
          <Card>
            <DataTable
              table={{ columns, rows }}
              isSorted
              entriesPerPage
              showTotalEntries
              noEndBorder
              canSearch
              isLoading={loading}
            />
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
