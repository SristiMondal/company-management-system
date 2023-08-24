import React, { useEffect, useState } from "react";
import "./AddRowModal.css";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { fetchCompanyData } from "../../utils/data";
import { addCompanyRow, editCompanyRow } from "../../redux/Dashboard/dashboardSlice";
import {useDispatch } from "react-redux";

const closeIcon = {
  position: "absolute",
  top: "10px",
  right: "20px",
  color: "#000000",
};

const textBoxStyle = {
  width: "500px",
};

const labelStyle = {
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "32px",
};

const buttonStyle = {
  textTransform: "none",
  padding: "6px 24px",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "8px",
};

const closeButton = {
  ...buttonStyle,
  color: "rgba(0,0,0,0.4)",
  borderColor: "rgba(0,0,0,0.4)",
  "&:hover": {
    borderColor: "rgba(0,0,0,0.4)",
  },
};

const saveButton = {
  ...buttonStyle,
  backgroundColor: "#000000",
  "&:hover": {
    backgroundColor: "#000000",
  },
};

const AddRowModal = (props: any) => {
  const {
    open,
    handleClose,
    IsEditMode,
    id,
    setLoader,
    loader,
    setOpenSnackbar,
  } = props;
  const [formDetails, setFormDetails] = useState<any>({
    name: "",
    phone: "",
    email: "",
    vat: "",
    website: "",
  });
  const dispatch=useDispatch()

  const handleSubmit = () => {
    const { name, phone, email, vat, website } = formDetails;
    if (!name || !phone || !email || !vat || !website) {
      setOpenSnackbar(true);
      return;
    }
    if (!IsEditMode) {
      dispatch(addCompanyRow(formDetails))
    }
    else{
      dispatch(editCompanyRow({id, formDetails}))
    }
    handleClose();
  };

  useEffect(() => {
    if (IsEditMode && id !== -1) {
      (async () => {
        let companies = await fetchCompanyData();
        let filteredRows = companies.filter((row: any) => row.id === id);
        setFormDetails({
          name: filteredRows[0]?.name,
          phone: filteredRows[0]?.phone,
          email: filteredRows[0]?.email,
          vat: filteredRows[0]?.vat,
          website: filteredRows[0]?.website,
        });
      })();
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-main"
    >
      <Box className="modal-body">
        {loader ? (
          <Box className="loader-box">
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <>
            <IconButton
              aria-label="close-icon"
              onClick={handleClose}
              sx={closeIcon}
              data-testid="add-edit-icon"
            >
              <Close />
            </IconButton>
            <Box className="modal-content">
              <Box className="field-box">
                <Typography sx={labelStyle}>Company Name :</Typography>
                <TextField
                  id="outlined-basic"
                  label="company-name"
                  variant="outlined"
                  size="small"
                  value={formDetails.name ?? ""}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormDetails((prev: any) => {
                      return { ...prev, name: event.target.value };
                    });
                  }}
                  sx={textBoxStyle}
                />
              </Box>
              <Box className="field-box">
                <Typography sx={labelStyle}>Contact :</Typography>
                <TextField
                  id="outlined-basic"
                  label="contact"
                  variant="outlined"
                  size="small"
                  value={formDetails.phone ?? ""}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormDetails((prev: any) => {
                      return { ...prev, phone: event.target.value };
                    });
                  }}
                  sx={textBoxStyle}
                />
              </Box>
              <Box className="field-box">
                <Typography sx={labelStyle}>Email :</Typography>
                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  size="small"
                  value={formDetails.email ?? ""}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormDetails((prev: any) => {
                      return { ...prev, email: event.target.value };
                    });
                  }}
                  sx={textBoxStyle}
                />
              </Box>
              <Box className="field-box">
                <Typography sx={labelStyle}>Vat :</Typography>
                <TextField
                  id="outlined-basic"
                  label="vat"
                  variant="outlined"
                  size="small"
                  value={formDetails.vat ?? ""}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormDetails((prev: any) => {
                      return { ...prev, vat: event.target.value };
                    });
                  }}
                  sx={textBoxStyle}
                />
              </Box>
              <Box className="field-box">
                <Typography sx={labelStyle}>Website :</Typography>
                <TextField
                  id="outlined-basic"
                  label="website"
                  variant="outlined"
                  size="small"
                  value={formDetails.website ?? ""}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFormDetails((prev: any) => {
                      return { ...prev, website: event.target.value };
                    });
                  }}
                  sx={textBoxStyle}
                />
              </Box>
              <Box className="modal-footer">
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={closeButton}
                  data-testid="close-add-edit-modal"
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={saveButton}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AddRowModal;
