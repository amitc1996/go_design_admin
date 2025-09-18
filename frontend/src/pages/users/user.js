import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import PageLayout from "pages/layouts/PageLayout";
import DataTable from "examples/Tables/DataTable";

import { listUsers } from "api/user";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // Define columns to match your JSON fields
  const columns = [
    { Header: "First Name", accessor: "first_name" },
    { Header: "Last Name", accessor: "last_name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Wallet Balance", accessor: "wallet_balance" },
  ];

  // Map rows from users
  const rows = users.map((u) => ({
    id: u.id,
    first_name: u.first_name,
    last_name: u.last_name,
    email: u.email,
    phone: u.phone,
    wallet_balance: u.wallet_balance,
    role: u.role,
    createdAt: new Date(u.createdAt).toLocaleString(),
    updatedAt: new Date(u.updatedAt).toLocaleString(),
  }));

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            {loading ? (
              <MDBox px={2} pb={2}>
                <MDTypography variant="button" color="text">
                  Loading users…
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
