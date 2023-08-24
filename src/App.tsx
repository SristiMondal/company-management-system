import React, { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import router from "./route";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
const Login = lazy(() => import("./Layout/Authentication/SignInPage"));

function App() {
  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<Navigate to="/login" />} />
          <Route path={"/login"} element={<Login />} />
          {/* <Route>
            <Layout>
              {router.map((route: any, index: any) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Layout>
          </Route> */}
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
