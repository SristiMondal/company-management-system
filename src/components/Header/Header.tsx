import React from "react";
import { Box } from "@mui/material";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box className="header">
      <Box className="logo" onClick={() => navigate("/")}>
        CMS
      </Box>
      <Box className="profile"></Box>
    </Box>
  );
};

export default Header;
