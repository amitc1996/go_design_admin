import React, { lazy } from "react";
import Icon from "@mui/material/Icon";
import CategoryIcon from "@mui/icons-material/Category";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function lazyWithDelay(factory, ms = 1000) {
  return React.lazy(() => Promise.all([factory(), sleep(ms)]).then(([module]) => module));
}

const Dashboard = lazyWithDelay(() => import("pages/Dashboard"), 1000);
const AccountSettings = lazyWithDelay(() => import("pages/AccountSettings"), 1000);
const SignIn = lazyWithDelay(() => import("pages/auth/Login"), 500);
const ForgotPassword = lazyWithDelay(() => import("pages/auth/ForgotPassword"), 500);
const ResetPassword = lazyWithDelay(() => import("pages/auth/ResetPassword"), 500);
const Users = lazyWithDelay(() => import("pages/users/user"), 1000);
const Projects = lazyWithDelay(() => import("pages/projects/project"), 1000);
const CreateProjects = lazyWithDelay(() => import("pages/projects/create_project"), 1000);
const ProjectCategory = lazyWithDelay(() => import("pages/ProjectCategories"), 1000);

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
    icon: <Icon fontSize="small">group</Icon>,
    route: "/users",
    component: <Users />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Project Categories",
    key: "project_categories",
    icon: <CategoryIcon fontSize="small" />,
    route: "/project_categories",
    component: <ProjectCategory />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Projects",
    key: "projects",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/projects",
    component: <Projects />,
    isPrivate: true,
  },
  {
    route: "/projects/create",
    component: <CreateProjects />,
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
