import React, { useState, useEffect } from "react";
import {
  Box,
  Backdrop,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import StrippedTable from "../../components/StrippedTable/StrippedTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Dashboard.css";
import { fetchCompanyData } from "../../utils/data";
import AddRowModal from "../../components/AddRowModal/AddRowModal";
import DeleteRowModal from "../../components/DeleteRowModal/DeleteRowModal";
import counterSlice, {
  decreamentCount,
  increamentCount,
} from "../../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  deleteCompanyRow,
  getCompanyList,
} from "../../redux/Dashboard/dashboardSlice";

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
  const [apiLoader, setApiLoader] = useState<boolean>(false);
  const [modalLoadar, setModalLoader] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [opensnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>(-1);
  const count = useSelector((state: RootState) => state.counter.count);
  const companies = useSelector(
    (state: RootState) => state.company.companyList
  );
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const companiesList = await fetchCompanyData();
    if (companiesList) {
      if (searchedText === "") {
        dispatch(getCompanyList(companiesList));
      }
      let filteredRows = companiesList.filter(
        (row: any) =>
          row.name.toLowerCase().includes(searchedText.toLowerCase()) ||
          row.email.toLowerCase().includes(searchedText.toLowerCase()) ||
          row.phone.toLowerCase().includes(searchedText.toLowerCase()) ||
          row.vat.toLowerCase().includes(searchedText.toLowerCase())
      );
      dispatch(getCompanyList(filteredRows));
    }
  };

  const handleAddButton = () => {
    setOpenAddModal(true);
  };

  const handleDelete = () => {
    setApiLoader(true);
    dispatch(deleteCompanyRow(rowId));
    handleCloseModal();
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
      const companiesList = await fetchCompanyData();
      if (companiesList) {
        dispatch(getCompanyList(companiesList));
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setRows(companies ?? []);
    setApiLoader(false);
  }, [companies]);

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
            <Box className="main-button-div">
              <Button
                variant="contained"
                onClick={handleAddButton}
                sx={addButton}
              >
                Add Rows
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(increamentCount(count));
                }}
                sx={addButton}
                title="increment"
              >
                {`++ ${count}`}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(decreamentCount(count));
                }}
                sx={addButton}
                title="decrement"
              >
                {`-- ${count}`}
              </Button>
            </Box>
            <SearchBar
              text={searchedText}
              setText={setSearchedText}
              handleSearch={handleSearch}
              textBoxStyle={textBoxStyle}
              name="Search"
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
          setOpenSnackbar={setOpenSnackbar}
        />
      ) : null}
      {openDeleteModal ? (
        <DeleteRowModal
          open={openDeleteModal}
          handleClose={handleCloseModal}
          handleDelete={handleDelete}
        />
      ) : null}
      <Snackbar
        open={opensnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          There is an error!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
