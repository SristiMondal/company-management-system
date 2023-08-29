import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { RootState } from "../../redux/store";
import { setAuthentication } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const loginHeader = {
  alignSelf: "center",
  fontSize: "22px",
  fontWeight: 600,
};

const textBoxStyle = {
  width: "400px",
  border: "1px solid #ffffff",
  borderRadius: "4px",
  alignSelf: "center",
  "&:hover": {
    border: "1px solid #ffffff",
  },
  ".MuiInputLabel-root": {
    display: "none",
  },
  ".MuiOutlinedInput-root": {
    color: "#ffffff",
  },
};

const loginButton = {
  textTransform: "none",
  width: "400px",
  fontSize: "16px",
  fontWeight: 500,
  borderRadius: "4px",
  backgroundColor: "#ffffff",
  color: "#000000",
  alignSelf: "center",
  "&:hover": {
    backgroundColor: "#ffffff",
  },
};

const SignInPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  const handleLogin = () => {
    if (!userName || !password) {
      return;
    } else {
      if (userName === "sristi" && password === "123") {
        dispatch(setAuthentication(true));
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
      } else {
        dispatch(setAuthentication(false));
      }
    }
  };

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated]);

  return (
    <Box className="signin-outer-box">
      <Box className="signin-card">
        <Box className="card-body">
          <Typography sx={loginHeader}>USER LOGIN</Typography>
          <TextField
            id="outlined-basic"
            label="company-name"
            variant="outlined"
            size="small"
            value={userName ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(event.target.value);
            }}
            sx={textBoxStyle}
          />
          <TextField
            id="outlined-basic"
            label="company-name"
            variant="outlined"
            size="small"
            value={password ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            sx={textBoxStyle}
          />
          <Button variant="contained" onClick={handleLogin} sx={loginButton}>
            LOGIN
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
