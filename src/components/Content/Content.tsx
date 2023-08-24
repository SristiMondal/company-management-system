import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import "./Content.css";

const Content = ({children}:any) => {
  return (
    <Box className="content">
       {children}
    </Box>
  );
};

export default Content;
