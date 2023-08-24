import React from "react";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import Footer from "../components/Footer/Footer";
import { Box } from "@mui/material";

const Layout = ({children}:any) => {
  return (
    <Box>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Box>
  );
};

export default Layout;
