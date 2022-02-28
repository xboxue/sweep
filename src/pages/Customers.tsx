import { Box, Button, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useGetCustomersQuery } from "../generated/graphql";

const Customers = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetCustomersQuery();

  if (loading) return <Skeleton />;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="h6">Customers</Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          //   onClick={() => navigate("/experiences/new")}
        >
          Add customer
        </Button>
      </Box>
      {data?.customers.length > 0 ? (
        <DataGrid
          //   onRowClick={(params) => navigate(`/experiences/${params.id}`)}
          rows={data?.customers}
          columns={[
            {
              field: "name",
              headerName: "Name",
              valueGetter: (params) =>
                `${params.row.firstName} ${params.row.lastName}`,
              flex: 1,
            },
            {
              field: "email",
              headerName: "Email",
              width: 200,
            },
          ]}
          autoHeight
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          // disableSelectionOnClick
        />
      ) : (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 400,
          }}
        >
          <Typography variant="subtitle1">Add and manage customers</Typography>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            // onClick={() => navigate("/experiences/new")}
          >
            Add customer
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Customers;
