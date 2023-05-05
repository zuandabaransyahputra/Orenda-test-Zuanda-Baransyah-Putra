import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormEditCustomer = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      const fetch = async (id) => {
        const response = await axios.get(
          `http://localhost:3000/customers/${id}`
        );
        setForm({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          address: response.data.data.address,
        });
      };
      fetch(id);
    }
  }, [id]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/customers/${id}`,
        form
      );
      Swal.fire(`${response?.data.status}`, "", "success");
    } catch (error) {
      Swal.fire(`Error`, "", "error");
    }
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
          <Button variant="outlined" onClick={handleClick}>
            Update
          </Button>
        </div>
      </Box>
    </>
  );
};

export default FormEditCustomer;
