import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  styled,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Box,
  IconButton,
  TableFooter,
} from "@mui/material";
import {
  LastPage,
  FirstPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function TablePaginationActions(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  cursor: "pointer",
}));

export default function StrippedTable(props: any) {
  const { rows, setEditMode, setRowId, setLoader, setOpenDeleteModal } = props;
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    setRowId(id);
    setEditMode(true);
    setLoader(true);
  };

  const handleDelete = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    setRowId(id);
    setOpenDeleteModal(true);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "25px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl No.</StyledTableCell>
            <StyledTableCell align="left">Company Name</StyledTableCell>
            <StyledTableCell align="left">Contact</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Vat</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any, index: number) => {
            const { id, name, phone, email, vat } = row;
            return (
              <StyledTableRow
                key={id}
                onClick={() => navigate(`/company_profile/${id}`)}
              >
                <StyledTableCell component="th" scope="row">
                  {`${rowsPerPage*(page)+index+1}.`}
                </StyledTableCell>
                <StyledTableCell align="left">{name}</StyledTableCell>
                <StyledTableCell align="left">{phone}</StyledTableCell>
                <StyledTableCell align="left">{email}</StyledTableCell>
                <StyledTableCell align="left">{vat}</StyledTableCell>
                <StyledTableCell align="left">
                  <Box className="actions-box">
                    <IconButton
                      aria-label="edit-icon"
                      onClick={(event: React.MouseEvent) =>
                        handleEdit(event, id)
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete-icon"
                      onClick={(event: React.MouseEvent) =>
                        handleDelete(event, id)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              sx={{
                ".MuiTablePagination-toolbar": {
                  marginRight: "30px",
                },
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
