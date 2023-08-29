import React, { Suspense, lazy } from "react";
import "./App.css";
import router from "./route";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
const Login = lazy(() => import("./Layout/Authentication/SignInPage"));
const Layout = lazy(() => import("./Layout/Layout"));
const Register = lazy(() => import("./Layout/Authentication/Register"));
const ForgotPassword = lazy(() => import("./Layout/Authentication/ForgotPassword"));

function App() {
  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<Navigate to="/login" />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/forgotpassword"} element={<ForgotPassword />} />
          <Route path={"*"} element={<Layout />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
