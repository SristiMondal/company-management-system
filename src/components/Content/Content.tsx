import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import router from "../../route";
import "./Content.css";

const Content = () => {
  return (
    <Box className="content">
      <Routes>
        {router.map((route: any, index: any) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Box>
  );
};

export default Content;
