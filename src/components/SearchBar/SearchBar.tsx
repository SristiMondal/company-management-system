import React, { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = (props: any) => {
  const { handleSearch, text, setText, textBoxStyle, containerStyle } = props;
  return (
    <Box sx={containerStyle}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={text}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setText(event.target.value);
        }}
        sx={textBoxStyle}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleSearch}
              sx={{ cursor: "pointer" }}
            >
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
