import { AddCircle, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  Paper,
  PaperProps,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import {
  Customer,
  useCreateCustomerMutation,
  useGetCustomerQuery,
  useGetCustomersLazyQuery,
} from "../../generated/graphql";
import useDebounce from "../../hooks/useDebounce";
import Dialog from "../common/Dialog/Dialog";
import TextField from "../common/TextField/TextField";
import CustomerForm, { initialValues } from "../CustomerForm/CustomerForm";

const DialogFormWrapper = (props: PaperProps<"form">) => {
  const formik = useFormikContext();
  return <Paper component="form" onSubmit={formik.handleSubmit} {...props} />;
};

interface Props {
  customerId?: string;
  onAdd: (customer: Customer) => void;
  onRemove: () => void;
}

const OrderCustomerForm = ({ customerId, onAdd, onRemove }: Props) => {
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const {
    loading,
    data: customerData,
    error,
  } = useGetCustomerQuery({
    variables: { id: customerId },
    skip: !customerId,
  });

  const [createCustomer] = useCreateCustomerMutation();
  const [getCustomers, { data }] = useGetCustomersLazyQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getCustomers({
        variables: {
          searchTerm: debouncedSearchTerm,
        },
      });
    }
  }, [getCustomers, debouncedSearchTerm]);

  if (loading) return <Skeleton />;
  const customer = customerData?.customer;

  return (
    <Stack spacing={2}>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={async (values) => {
          try {
            const { data } = await createCustomer({
              variables: { input: values },
            });
            const customer = data?.createCustomer?.customer;
            onAdd(customer);
            setCustomerDialogOpen(false);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Dialog
          PaperComponent={DialogFormWrapper}
          open={customerDialogOpen}
          fullWidth
          maxWidth="sm"
          onClose={() => setCustomerDialogOpen(false)}
          title="Create customer"
          actions={[
            {
              children: "Cancel",
              onClick: () => setCustomerDialogOpen(false),
            },
            { children: "Save", variant: "contained", type: "submit" },
          ]}
        >
          <CustomerForm />
        </Dialog>
      </Formik>
      {customer ? (
        <Box sx={{ display: "flex" }}>
          <Avatar />
          <Box ml={1}>
            <Typography variant="subtitle2">
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography variant="body2">{customer.email}</Typography>
            <Typography variant="body2">{customer.phoneNumber}</Typography>
          </Box>
          <Box>
            <IconButton size="small" onClick={onRemove}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <>
          <Autocomplete
            value=""
            freeSolo
            inputValue={searchTerm}
            onInputChange={(_, value) => setSearchTerm(value)}
            options={[{}, ...(data?.customers || [])]}
            filterOptions={(x) => x}
            getOptionLabel={(option) => option.id || ""}
            clearOnBlur={false}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search or create a customer"
              />
            )}
            renderOption={(props, option) => {
              if (!option.id) {
                return (
                  <Box
                    component="li"
                    {...props}
                    onClick={() => setCustomerDialogOpen(true)}
                  >
                    <AddCircle color="disabled" fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Create a new customer
                    </Typography>
                  </Box>
                );
              }
              return (
                <Box
                  component="li"
                  {...props}
                  sx={{ display: "block !important" }}
                  onClick={() => onAdd(option)}
                >
                  <Typography variant="body2">
                    {option.firstName} {option.lastName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {option.email}
                  </Typography>
                </Box>
              );
            }}
          />
        </>
      )}
    </Stack>
  );
};

export default OrderCustomerForm;
