import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./index.css";

const textBoxStyle = {
  width: "400px",
};

const saveButton = {
  textTransform: "none",
  padding: "6px 24px",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "8px",
  backgroundColor: "#000000",
  "&:hover": {
    backgroundColor: "#000000",
  },
};

const SignInPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!userName || !password) {
      return;
    } else {
      localStorage.setItem("userName",userName)
      localStorage.setItem("password",password)
    }
  };
console.log(localStorage.getItem("userName"))
console.log(localStorage.getItem("password"))
  return (
    <Box className="signin-outer-box">
      <Box className="signin-card">
        <Box>USER LOGIN</Box>
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
        <Button variant="contained" onClick={handleLogin} sx={saveButton}>
          LOGIN
        </Button>
      </Box>
    </Box>
  );
};

export default SignInPage;
