import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "store/AuthContext";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuthState();
  const location = useLocation();

  if (loading) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" height="100vh">
        <MDTypography>Loading...</MDTypography>
      </MDBox>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
