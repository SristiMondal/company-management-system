import React from "react";
import { Box, Button, IconButton, Modal } from "@mui/material";
import "./DeleteRowModal.css";
import { Close } from "@mui/icons-material";

const closeIcon = {
  position: "absolute",
  top: "10px",
  right: "20px",
  color: "#000000",
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

const deleteButton = {
  ...buttonStyle,
  backgroundColor: "#DC143C",
  "&:hover": {
    backgroundColor: "#DC143C",
  },
};

const DeleteRowModal = (props: any) => {
  const { open, handleClose, handleDelete } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-main"
    >
      <Box className="modal-body">
        <IconButton
          aria-label="close-icon"
          onClick={handleClose}
          sx={closeIcon}
        >
          <Close />
        </IconButton>
        <Box className="modal-content">
          <Box>Hi</Box>
          <Box className="modal-footer">
            <Button variant="outlined" onClick={handleClose} sx={closeButton}>
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={deleteButton}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteRowModal;
