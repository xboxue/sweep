import { Box, Button, Skeleton, Typography } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import { Booking, useGetMyCartQuery } from "../../generated/graphql";

interface Props {
  bookings: Booking[];
}

const ExperiencesForm = ({ bookings }: Props) => {
  const columns: GridColumns = [
    {
      field: "offering",
      headerName: "Experience",
      flex: 1,
      valueGetter: (params) => params.value.name,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={params.row.offering.featuredImage.url}
            sx={{
              width: 40,
              height: 40,
              objectFit: "contain",
              borderRadius: 1,
              border: 1,
              borderColor: (theme) => theme.palette.divider,
              mr: 1,
            }}
          />
          <Typography variant="inherit">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "timeSlot",
      headerName: "Date",
      width: 250,
      valueGetter: (params) => params.value.startDateTime,
      valueFormatter: (params) =>
        DateTime.fromISO(params.value).toFormat("DDDD t"),
    },

    {
      field: "numGuests",
      headerName: "Guests",
    },
    {
      field: "total",
      headerName: "Total",
      valueFormatter: (params) => `$${(params.value / 100).toFixed(2)}`,
    },
  ];

  return (
    <DataGrid
      rows={bookings}
      columns={columns}
      hideFooter
      disableColumnFilter
      disableColumnMenu
      disableSelectionOnClick
      autoHeight
      sx={{ border: 0 }}
    />
  );
};

export default ExperiencesForm;
