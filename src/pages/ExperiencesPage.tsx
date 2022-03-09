import { Box, Button, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useGetOfferingsQuery } from "../generated/graphql";

const ExperiencesPage = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useGetOfferingsQuery();

  if (loading) return <Skeleton />;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="h6">Experiences</Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/experiences/new")}
        >
          Add experience
        </Button>
      </Box>
      {data?.offerings && data.offerings.length > 0 ? (
        <DataGrid
          onRowClick={(params) => navigate(`/experiences/${params.id}`)}
          rows={data.offerings}
          columns={[
            {
              field: "featuredImage",
              headerName: "",
              renderCell: (params) =>
                params.value ? (
                  <Box
                    component="img"
                    src={params.value.url}
                    alt={params.value.altText}
                    sx={{
                      objectFit: "contain",
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      border: 1,
                      borderColor: (theme) => theme.palette.divider,
                    }}
                  />
                ) : null,
            },
            { field: "name", headerName: "Name", flex: 1 },
            {
              field: "status",
              headerName: "Status",
              renderCell: (params) => <Chip label={params.value} />,
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
            Add and manage your experiences
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => navigate("/experiences/new")}
          >
            Add experience
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ExperiencesPage;
