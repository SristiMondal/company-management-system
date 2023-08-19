import React, { useState, useEffect } from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import StrippedTable from "../../components/StrippedTable/StrippedTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Dashboard.css";
import { fetchCompanyData } from "../../utils/data";

const containerStyle = { textAlign: "end" };

const textBoxStyle = {
  width: "300px",
};

const Dashboard = () => {
  const [searchedText, setSearchedText] = useState<string>("");
  const [rows, setRows] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const handleSearch = async () => {
    const companies = await fetchCompanyData();
    if (companies) {
      if (searchedText === "") {
        setRows(companies);
      }
      let filteredRows = companies.filter(
        (row: any) =>
          row.name.toLowerCase().includes(searchedText.toLowerCase()) ||
          row.email.toLowerCase().includes(searchedText.toLowerCase()) ||
          row.phone.toLowerCase().includes(searchedText.toLowerCase()) ||
          row.vat.toLowerCase().includes(searchedText.toLowerCase())
      );
      setRows(filteredRows);
      console.log(filteredRows, "filteredRows");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const companies = await fetchCompanyData();
      if (companies) {
        setRows(companies);
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      {loader ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={loader}
          onClick={() => {
            console.log("Hi");
          }}
          data-testid="loading-spinner-dashboard"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box className="dashboard">
          <SearchBar
            containerStyle={containerStyle}
            text={searchedText}
            setText={setSearchedText}
            handleSearch={handleSearch}
            textBoxStyle={textBoxStyle}
            name="search"
          />
          <StrippedTable rows={rows} setRows={setRows} />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
