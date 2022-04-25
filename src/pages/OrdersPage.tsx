import { Box, Button, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import pluralize from "pluralize";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../generated/graphql";

const OrdersPage = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetOrdersQuery({
    fetchPolicy: "network-only",
  });

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
              valueFormatter: (params) => `#${params.value}`,
            },
            {
              field: "createdAt",
              headerName: "Date",
              valueFormatter: (params) =>
                DateTime.fromISO(params.value).toFormat("MMM d, t"),
              width: 150,
            },
            {
              field: "customer",
              headerName: "Customer",
              valueGetter: (params) =>
                `${params.value.firstName} ${params.value.lastName}`,
              width: 150,
            },
            {
              field: "total",
              headerName: "Total",
              valueFormatter: (params) => `$${(params.value / 100).toFixed(2)}`,
              width: 100,
            },
            {
              field: "bookings",
              headerName: "Bookings",
              valueGetter: (params) =>
                `${params.value.length} ${pluralize(
                  "booking",
                  params.value.length
                )}`,
              width: 100,
            },
            {
              field: "totalPaid",
              headerName: "Payment status",
              valueGetter: (params) => {
                if (params.value < params.row.total) {
                  if (params.value === 0) return "Unpaid";
                  return "Partially paid";
                }
                return "Paid";
              },
              renderCell: (params) => (
                <Chip
                  label={params.value}
                  size="small"
                  sx={{
                    ...(params.value !== "Paid" && {
                      bgcolor: "rgba(255, 215, 157, 1)",
                    }),
                  }}
                />
              ),
              width: 150,
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
