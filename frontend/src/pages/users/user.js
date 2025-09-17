import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import PageLayout from "pages/layouts/PageLayout";

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

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            {/* <MDBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
              <MDTypography variant="h6">Users</MDTypography>
              <Icon fontSize="small">group</Icon>
            </MDBox> */}

            {loading ? (
              <MDBox px={2} pb={2}>
                <MDTypography variant="button" color="text">
                  Loading users…
                </MDTypography>
              </MDBox>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <MDTypography variant="button" color="text">
                            No users found.
                          </MDTypography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((u) => (
                        <TableRow key={u.id || u._id}>
                          <TableCell>{u.id || u._id}</TableCell>
                          <TableCell>
                            {u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim()}
                          </TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>{u.role || u.type || ""}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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
