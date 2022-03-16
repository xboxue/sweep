import { Box, Button, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../generated/graphql";

const OrdersPage = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetOrdersQuery();

  if (loading) return <Skeleton />;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="h6">Orders</Typography>

        {/* <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/experiences/new")}
        >
          Add experience
        </Button> */}
      </Box>
      {data?.orders.length > 0 ? (
        <DataGrid
          onRowClick={(params) => navigate(`/orders/${params.id}`)}
          rows={data?.orders}
          columns={[
            {
              field: "id",
              headerName: "Order",
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
            // onClick={() => navigate("/orders/new")}
          >
            Create order
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default OrdersPage;
