import { DatePicker } from "@mui/lab";
import { Button, MenuItem } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useFormikContext } from "formik";
import { range } from "lodash";
import { DateTime } from "luxon";
import { Offering, PricingType } from "../../generated/graphql";
import FormikTextField from "../common/FormikTextField/FormikTextField";
import TextField from "../common/TextField/TextField";

interface Props {
  offerings: Offering[];
}

const ExperiencesForm = ({ offerings }: Props) => {
  const formik = useFormikContext();
  const columns: GridColumns = [
    {
      field: "offeringId",
      headerName: "Experience",
      flex: 1,
      valueGetter: (params) => {
        const offering = offerings.find(
          (offering) => offering.id === params.value
        );
        return offering.name;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        const index = params.api.getRowIndex(params.row.id);

        return (
          <DatePicker
            value={params.value}
            onChange={(value) => {
              formik.setFieldValue(`bookings.${index}.date`, value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        );
      },
    },
    {
      field: "time",
      headerName: "Time",
      width: 200,
      renderCell: (params) => {
        const index = params.api.getRowIndex(params.row.id);
        const offering = offerings.find(
          (offering) => offering.id === params.row.offeringId
        );
        const timeSlots = offering.schedule.timeSlots.filter(
          (timeSlot) => params.row.date?.weekday - 1 === timeSlot.day
        );
        return (
          <FormikTextField
            select
            field={`bookings.${index}.time`}
            value={params.value}
          >
            {timeSlots.map((timeSlot) => (
              <MenuItem key={timeSlot.startTime} value={timeSlot.startTime}>
                {DateTime.fromFormat(timeSlot.startTime, "HH:mm:ss").toFormat(
                  "h:mm a"
                )}
              </MenuItem>
            ))}
          </FormikTextField>
        );
      },
    },
    {
      field: "numGuests",
      headerName: "Guests",
      renderCell: (params) => {
        const index = params.api.getRowIndex(params.row.id);
        return (
          <FormikTextField
            select
            field={`bookings.${index}.numGuests`}
            value={params.value}
            SelectProps={{
              MenuProps: { PaperProps: { sx: { maxHeight: 300 } } },
            }}
          >
            {range(1, 50).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </FormikTextField>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      valueGetter: (params) => {
        const offering = offerings.find(
          (offering) => offering.id === params.row.offeringId
        );
        return offering?.pricingType === PricingType.PerPerson
          ? (offering?.pricePerPerson / 100) * params.row.numGuests
          : offering?.priceTotalAmount / 100;
      },
      valueFormatter: (params) => `$${params.value}`,
    },
  ];

  return (
    <>
      <Button>Add booking</Button>
      <DataGrid
        rows={formik.values.bookings}
        getRowId={(row) => row.id}
        columns={columns}
        hideFooter
        disableColumnFilter
        disableColumnMenu
        disableSelectionOnClick
        autoHeight
        sx={{ border: 0 }}
      />
    </>
  );
};

export default ExperiencesForm;
