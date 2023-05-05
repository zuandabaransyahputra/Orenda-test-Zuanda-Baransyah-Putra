import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const Paginations = ({ page, onChange, totalPage, className, disabled }) => {
  return (
    <Stack
      spacing={2}
      className={["flex items-center justify-center w-full", className].join(
        " "
      )}
    >
      <Pagination
        page={page}
        onChange={onChange}
        count={totalPage}
        disabled={disabled}
        variant="outlined"
        color="primary"
        shape="rounded"
        className="text-black"
      />
    </Stack>
  );
};

export default Paginations;
