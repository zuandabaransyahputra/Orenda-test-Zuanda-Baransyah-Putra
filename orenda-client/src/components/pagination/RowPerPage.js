import { MenuItem, Select, Typography } from "@mui/material";

function RowsPerPage({ values, value = 10, className, onChange }) {
  return (
    <div className={`${className} flex gap-10 items-center`}>
      <Typography>Rows per page: </Typography>
      <Select
        size="small"
        value={value}
        inputProps={{ "aria-label": "Rows per page" }}
        onChange={(e) => onChange(e.target.value)}
      >
        {values.map((row, index) => (
          <MenuItem key={index} value={row}>
            {row}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default RowsPerPage;
