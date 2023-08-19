import React, { useState, useEffect } from "react";
import { Box, Backdrop, CircularProgress, Button } from "@mui/material";
import StrippedTable from "../../components/StrippedTable/StrippedTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Dashboard.css";
import { fetchCompanyData } from "../../utils/data";
import AddRowModal from "../../components/AddRowModal/AddRowModal";
import DeleteRowModal from "../../components/DeleteRowModal/DeleteRowModal";

const textBoxStyle = {
  width: "300px",
};

const addButton = {
  textTransform: "none",
  fontSize: "16px",
  padding: "6px 32px",
  backgroundColor: "#000000",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#000000",
  },
};

const Dashboard = () => {
  const [searchedText, setSearchedText] = useState<string>("");
  const [rows, setRows] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [modalLoadar, setModalLoader] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(-1);

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
    }
  };

  const handleAddButton = () => {
    setOpenAddModal(true);
  };

  const handleDelete = () => {
    console.log(rowId, "deleted");
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
    setEditMode(false);
    setRowId(-1);
    setModalLoader(false);
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    if (editMode) {
      handleAddButton();
    }
  }, [editMode]);

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
          <Box className="dashboard-header">
            <Button
              variant="contained"
              onClick={handleAddButton}
              sx={addButton}
            >
              Add Rows
            </Button>
            <SearchBar
              text={searchedText}
              setText={setSearchedText}
              handleSearch={handleSearch}
              textBoxStyle={textBoxStyle}
              name="search"
            />
          </Box>
          <StrippedTable
            rows={rows}
            setEditMode={setEditMode}
            setOpenDeleteModal={setOpenDeleteModal}
            setRowId={setRowId}
            setLoader={setModalLoader}
          />
        </Box>
      )}
      {openAddModal ? (
        <AddRowModal
          open={openAddModal}
          handleClose={handleCloseModal}
          IsEditMode={editMode}
          id={rowId}
          setLoader={setModalLoader}
          loader={modalLoadar}
        />
      ) : null}
      {openDeleteModal ? (
        <DeleteRowModal
          open={openDeleteModal}
          handleClose={handleCloseModal}
          handleDelete={handleDelete}
        />
      ) : null}
    </Box>
  );
};

export default Dashboard;
