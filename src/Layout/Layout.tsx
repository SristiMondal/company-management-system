import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import Footer from "../components/Footer/Footer";
import { Box } from "@mui/material";
import router from "../route";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthentication } from "../redux/authSlice";
import { RootState } from "../redux/store";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  useEffect(() => {
    if (
      localStorage.getItem("userName") === "sristi" &&
      localStorage.getItem("password") === "123"
    ) {
      dispatch(setAuthentication(true));
    } else {
      dispatch(setAuthentication(false));
    }
  }, []);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  return (
    <Box>
      <Header />
      <Content>
        <Routes>
          {router.map((route: any, index: any) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Content>
      <Footer />
    </Box>
  );
};

export default Layout;
