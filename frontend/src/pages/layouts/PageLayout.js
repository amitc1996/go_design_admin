import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PageLayout({ children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} minHeight="100vh">
        {children}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
