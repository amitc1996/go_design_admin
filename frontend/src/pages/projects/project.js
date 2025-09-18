import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import PageLayout from "pages/layouts/PageLayout";
import DataTable from "examples/Tables/DataTable";

import { listUsers } from "api/user"; // Replace this with your real API (e.g., listProjects)

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const data = await listUsers(); // <-- Replace with listProjects() if available
        if (isMounted) {
          setProjects(Array.isArray(data) ? data : data?.items || []);
        }
      } catch (err) {
        if (isMounted) setError(err?.message || "Failed to load projects");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Define DataTable columns
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Owner", accessor: "owner" },
    { Header: "Status", accessor: "status" },
  ];

  // Transform project data into rows for DataTable
  const rows = projects.map((p) => ({
    id: p.id || p._id,
    name: p.name || "Untitled",
    owner: p.owner?.name || p.owner || "N/A",
    status: p.status || "Unknown",
  }));

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            {loading ? (
              <MDBox px={2} pb={2}>
                <MDTypography variant="button" color="text">
                  Loading projects…
                </MDTypography>
              </MDBox>
            ) : (
              <DataTable
                table={{ columns, rows }}
                isSorted={true}
                entriesPerPage={true}
                showTotalEntries={true}
                noEndBorder
                canSearch={true}
              />
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
        dateTime=""
      />
    </PageLayout>
  );
}
