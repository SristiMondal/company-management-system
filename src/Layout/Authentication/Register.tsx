import React, { useState } from "react";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.css";

const registerHeader = {
  alignSelf: "center",
  fontSize: "22px",
  fontWeight: 600,
};

const textBoxStyle = {
  color: "#000000",
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
};

const registerButton = {
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
  fontWeight: 600,
  fontSize: "12px",
  margin: "0px 5px",
  "&:hover": {
    color: "#0000ff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const testStyle = {
  fontWeight: 500,
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
};

const labelStyle = {
  color: "#141518",
  fontSize: "14px",
};

const footerTextStyle = {
  fontSize: "16px",
};

const footerLinkStyle = {
  color: "#4169e1",
  fontWeight: 600,
  fontSize: "16px",
  "&:hover": {
    color: "#0000ff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmedPassword: "",
  });
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleRegister = () => {
    const { firstName, lastName, phone, email, password, confirmedPassword } =
      formDetails;
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmedPassword ||
      password !== confirmedPassword
    ) {
      return;
    }
    localStorage.setItem(
      "profile",
      JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
      })
    );
    localStorage.setItem("userName", email);
    localStorage.setItem("password", password);
    navigate("/dashboard");
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <Box className="signin-outer-box">
      <Box className="register-card">
        <Box className="register-card-body">
          <Typography sx={registerHeader}>REGISTER</Typography>
          <Box>
            <Typography sx={labelStyle}>First Name:</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDetails.firstName ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormDetails({
                  ...formDetails,
                  firstName: event.target.value,
                });
              }}
              sx={textBoxStyle}
            />
          </Box>
          <Box>
            <Typography sx={labelStyle}>Last Name:</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDetails.lastName ?? null}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormDetails({
                  ...formDetails,
                  lastName: event.target.value,
                });
              }}
              sx={textBoxStyle}
            />
          </Box>
          <Box>
            <Typography sx={labelStyle}>Phone:</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDetails.phone ?? null}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormDetails({ ...formDetails, phone: event.target.value });
              }}
              sx={textBoxStyle}
            />
          </Box>
          <Box>
            <Typography sx={labelStyle}>Email:</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDetails.email ?? null}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormDetails({ ...formDetails, email: event.target.value });
              }}
              sx={textBoxStyle}
            />
          </Box>
          <Box>
            <Typography sx={labelStyle}>Password:</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDetails.password ?? null}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormDetails({
                  ...formDetails,
                  password: event.target.value,
                });
              }}
              sx={textBoxStyle}
            />
          </Box>
          <Box>
            <Typography sx={labelStyle}>Confirm Password:</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={formDetails.confirmedPassword ?? null}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormDetails({
                  ...formDetails,
                  confirmedPassword: event.target.value,
                });
              }}
              sx={textBoxStyle}
            />
          </Box>
          <Box className="term-condition">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              disableRipple={true}
            />
            <Typography sx={testStyle}>
              By agree to all the{" "}
              <Typography sx={linkStyle}>teams & conditions</Typography> and{" "}
              <Typography sx={linkStyle}>Privacy</Typography> Policy.
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleRegister}
            sx={registerButton}
            disabled={
              !formDetails.firstName ||
              !formDetails.lastName ||
              !formDetails.phone ||
              !formDetails.email ||
              !formDetails.password ||
              !formDetails.confirmedPassword ||
              formDetails.password !== formDetails.confirmedPassword ||
              !checked
            }
          >
            CREATE ACCOUNT
          </Button>
          <Box className="register-footer">
            <Typography sx={footerTextStyle}>
              Already have an account?
            </Typography>
            <Typography sx={footerLinkStyle} onClick={handleLoginButton}>
              Log in
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
