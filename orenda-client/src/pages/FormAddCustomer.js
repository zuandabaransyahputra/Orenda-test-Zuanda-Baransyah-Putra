import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const FormAddCustomer = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/customers",
        form
      );
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      Swal.fire(`${response?.data.message}`, "", "success");
    } catch (error) {
      Swal.fire(`Error`, "", "error");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="flex items-start justify-between gap-10">
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <TextField
              id="outlined-basic"
              label="Customer Name"
              variant="outlined"
              fullWidth
              value={form.name}
              name="name"
              onChange={handleChange}
              className="mb-10"
            />
            <div className="w-full flex items-start justify-between gap-4">
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                className="w-[50%]"
                name="phone"
                onChange={handleChange}
                value={form.phone}
              />
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                className="w-[50%]"
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
            </div>
          </div>
          <div className="w-full">
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              minRows={4}
              fullWidth
              name="address"
              onChange={handleChange}
              value={form.address}
            />
          </div>
        </div>
        <div className="w-full p-4 flex gap-4 justify-end">
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleClick}
            disabled={Object.values(form).some((item) => item === "")}
          >
            Create New
          </Button>
        </div>
      </Box>
    </>
  );
};

export default FormAddCustomer;
