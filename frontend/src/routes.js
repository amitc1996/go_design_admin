import Dashboard from "layouts/dashboard";
import Icon from "@mui/material/Icon";
import SignIn from "pages/auth/Login";
import ForgotPassword from "pages/auth/ForgotPassword";
import ResetPassword from "pages/auth/ResetPassword";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">group</Icon>, // changed
    route: "/users",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Projects",
    key: "projects",
    icon: <Icon fontSize="small">work</Icon>, // changed
    route: "/projects",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Dashboard />,
  },
  {
    route: "/login",
    component: <SignIn />,
  },
  {
    route: "/forgot_password",
    component: <ForgotPassword />,
  },
  {
    route: "/reset_password",
    component: <ResetPassword />,
  },
];

export default routes;
