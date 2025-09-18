import Dashboard from "pages/Dashboard";
import AccountSettings from "pages/AccountSettings";
import Icon from "@mui/material/Icon";
import SignIn from "pages/auth/Login";
import ForgotPassword from "pages/auth/ForgotPassword";
import ResetPassword from "pages/auth/ResetPassword";
import Users from "pages/users/user";
import Projects from "pages/projects/project";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">group</Icon>, // changed
    route: "/users",
    component: <Users />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Projects",
    key: "projects",
    icon: <Icon fontSize="small">work</Icon>, // changed
    route: "/projects",
    component: <Projects />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <AccountSettings />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    route: "/login",
    component: <SignIn />,
    isPrivate: false,
  },
  {
    route: "/forgot_password",
    component: <ForgotPassword />,
    isPrivate: false,
  },
  {
    route: "/reset_password",
    component: <ResetPassword />,
    isPrivate: false,
  },
];

export default routes;
