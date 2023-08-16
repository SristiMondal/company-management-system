import React from "react";
import { Navigate } from "react-router-dom";
const Dashboard = React.lazy(() => import("./Layout/Dashboard/Dashboard"));
const CompanyProfile = React.lazy(
  () => import("./Layout/CompanyProfile/CompanyProfile")
);

const routes = [
  {
    path: "/", // Root path
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/company_profile/:id",
    element: <CompanyProfile />,
  },
  {
    path: "*", // Catch-all route for unmatched paths
    element: <Navigate to="/dashboard" />,
  },
];

export default routes;
