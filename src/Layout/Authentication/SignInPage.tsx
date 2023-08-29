import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { RootState } from "../../redux/store";
import { setAuthentication } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./index.css";

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
    backgroundColor: "rgba(255,255,255,0.9)",
  },
};

const linkStyle = {
  color: "#4169e1",
  fontWeight: 500,
  fontSize: "12px",
  "&:hover": {
    color: "#0000ff",
    textDecoration: "underline",
  },
};

const SignInPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [showOtpBox, setShowOtpBox] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  let intervalId: any;

  const handleLogin = () => {
    if (!userName || !password) {
      return;
    } else {
      if (userName === "sristi" && password === "123") {
        setShowOtpBox(true);
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
      } else {
        dispatch(setAuthentication(false));
      }
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  const handleOTPVerification = () => {
    if (!userName || !password) {
      return;
    } else {
      if (userName === "sristi" && password === "123" && OTP === "123456") {
        dispatch(setAuthentication(true));
      } else {
        dispatch(setAuthentication(false));
      }
    }
  };

  const handleResendOTP = () => {
    console.log("handleResendOTP");
    let count = 59;
    setCounter(count);
    intervalId = setInterval(() => {
      setCounter(count--);
    }, 1000);

    if (count === 0) {
      // clearInterval(intervalId);
    }
  };

  const handleGoBack = () => {
    setOTP("");
    // clearInterval(intervalId);
    setShowOtpBox(false);
  };

  useEffect(() => {
    if (counter === 0) {
      // clearInterval(intervalId);
    }
  }, [counter]);

  useEffect(() => {
    // clearInterval(intervalId);
    if (showOtpBox) {
      // handleResendOTP();
    }
  }, [showOtpBox]);

  useEffect(() => {
    clearInterval(intervalId);
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
          {showOtpBox ? (
            <>
              <TextField
                id="outlined-basic"
                label="company-name"
                variant="outlined"
                size="small"
                value={OTP ?? null}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setOTP(event.target.value);
                }}
                sx={textBoxStyle}
              />
              <Button
                variant="contained"
                onClick={handleOTPVerification}
                sx={loginButton}
              >
                VERIFY OTP
              </Button>
              <Box className="link-box">
                <Typography
                  sx={{ ...linkStyle, cursor: "pointer" }}
                  onClick={handleGoBack}
                >
                  Go back
                </Typography>
                <Typography
                  sx={{
                    ...linkStyle,
                    cursor: counter > 0 ? "default" : "pointer",
                  }}
                  onClick={handleResendOTP}
                >
                  {counter > 0 ? `Resend OTP in ${counter} secs` : "Resend OTP"}
                </Typography>
              </Box>
            </>
          ) : (
            <>
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
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={loginButton}
              >
                LOGIN
              </Button>
              <Box className="link-box">
                <Typography sx={{...linkStyle, cursor:"pointer"}} onClick={handleSignUp}>
                  Don't have an account?
                </Typography>
                <Typography sx={{...linkStyle, cursor:"pointer"}} onClick={handleForgotPassword}>
                  Forgot Password?
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
