import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FormAddCustomer from "./FormAddCustomer";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Main Menu
  </Link>,
  <Link key="2" underline="none" color="text.primary">
    Create New Customer
  </Link>,
];
const AddNewCustomer = () => {
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
            <Typography className="p-2">Customer Information</Typography>
            <FormAddCustomer />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewCustomer;
