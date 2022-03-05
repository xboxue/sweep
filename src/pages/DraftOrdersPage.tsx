import { Box, Button, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useGetDraftOrdersQuery } from "../generated/graphql";

const DraftOrdersPage = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetDraftOrdersQuery();

  if (loading) return <Skeleton />;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="h6">Draft Orders</Typography>

        {/* <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/experiences/new")}
        >
          Add experience
        </Button> */}
      </Box>
      {data?.draftOrders.length > 0 ? (
        <DataGrid
          onRowClick={(params) => navigate(`/draft-orders/${params.id}`)}
          rows={data?.draftOrders}
          columns={[
            {
              field: "id",
              headerName: "Draft Order",
              valueGetter: (params) => `#D${params.value}`,
              flex: 1,
            },
            // {
            //   field: "status",
            //   headerName: "Status",
            //   renderCell: (params) => <Chip label={params.value} />,
            // },
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
          <Typography variant="subtitle1">
            Manually create orders and invoices
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            // onClick={() => navigate("/draft-orders/new")}
          >
            Create draft order
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default DraftOrdersPage;
