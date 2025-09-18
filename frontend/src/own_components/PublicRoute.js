import { Navigate } from "react-router-dom";
import { useAuthState } from "store/AuthContext";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuthState();

  if (loading) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" height="100vh">
        <MDTypography>Loading...</MDTypography>
      </MDBox>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

export default PublicRoute;
