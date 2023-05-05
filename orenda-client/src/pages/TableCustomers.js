import { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

const TableCustomers = ({ content, loading, setIsUpdate }) => {
  const navigate = useNavigate();
  const listDataTable = useMemo(() => {
    if (!content) return [];
    return content?.data.map((v) => ({
      name: v?.name,
      email: v.email,
      phone: v.phone,
      address: v.address,
      action: v.id,
    }));
  }, [content]);

  const handleEdit = (e, value) => {
    navigate(`/${value}`);
  };

  const handleDelete = async (e, value) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/customers/${value}`
      );
      Swal.fire(`${response?.data.message}`, "", "success");
      setIsUpdate(true);
    } catch (error) {
      Swal.fire(`Error`, "", "error");
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Customer Name",
        Cell: ({ cell }) => {
          return <div className="w-[200px]">{cell.getValue()}</div>;
        },
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        Cell: ({ cell }) => {
          return <div className="text-left">{cell.getValue()}</div>;
        },
      },
      {
        accessorKey: "email",
        header: "Email Address",
        Cell: ({ cell }) => {
          return <div className="text-left">{cell.getValue()}</div>;
        },
      },
      {
        accessorKey: "address",
        header: "Address",
        Cell: ({ cell }) => {
          return <div className="text-left">{cell.getValue()}</div>;
        },
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ cell }) => {
          return (
            <div className="text-left flex gap-4 justify-start">
              <Button
                variant="contained"
                onClick={(e) => handleEdit(e, cell.getValue())}
                startIcon={<Edit />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                onClick={(e) => handleDelete(e, cell.getValue())}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        // onPaginationChange={setPagination}
        // state={{ isLoading: loading, pagination }}
        data={listDataTable}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: false }}
      />
    </>
  );
};

export default TableCustomers;
