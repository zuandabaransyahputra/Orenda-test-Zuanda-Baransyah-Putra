import React, { useEffect, useState } from "react";
import TableCustomers from "./TableCustomers";
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  Link,
  Paper,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Main Menu
  </Link>,
];

const Customer = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isUpdate, setIsUpdate] = useState(false);
  const [filter, setFilter] = useState({
    keyword: "",
  });
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/add");
  };

  useEffect(() => {
    if (isUpdate) {
      const fetch = async () => {
        const response = await axios.get(
          `http://localhost:3000/customers?limit=${rowsPerPage}&page=${page}`
        );
        setData(response.data);
      };

      fetch();
    }
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/customers?limit=${rowsPerPage}&page=${page}&keyword=${filter.keyword}`
      );
      setData(response.data);
    };

    fetch();
  }, [page, rowsPerPage, filter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (e) => {
    setFilter({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography sx={{}}>Customers Pages</Typography>
      <Breadcrumbs
        sx={{ mb: 2 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <Typography>All Customers</Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleClick}
              >
                Add New Customer
              </Button>
            </div>
            <div className="mb-4">
              <TextField
                id="outlined-basic"
                label="Search Name"
                variant="outlined"
                value={filter.keyword}
                name="keyword"
                onChange={handleChange}
                className="mb-10"
              />
            </div>
            {data.length === 0 ? (
              <CircularProgress />
            ) : (
              <>
                <TableCustomers
                  content={data}
                  loading={false}
                  setIsUpdate={setIsUpdate}
                />
                <TablePagination
                  component="div"
                  count={data.total}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Customer;
