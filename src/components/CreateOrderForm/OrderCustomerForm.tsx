import { AddCircle, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  DialogProps,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import {
  Customer,
  useCreateCustomerMutation,
  useGetCustomersLazyQuery,
} from "../../generated/graphql";
import useDebounce from "../../hooks/useDebounce";
import Dialog from "../common/Dialog/Dialog";
import TextField from "../common/TextField/TextField";
import CustomerForm, { initialValues } from "../CustomerForm/CustomerForm";

const DialogFormWrapper = (props) => {
  const formik = useFormikContext();
  return <Paper component="form" onSubmit={formik.handleSubmit} {...props} />;
};

interface Props {
  customer?: Customer;
}

const OrderCustomerForm = ({ customer: initialCustomer }: Props) => {
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [customer, setCustomer] = useState(initialCustomer);

  const [createCustomer] = useCreateCustomerMutation();
  const [getCustomers, { loading, error, data }] = useGetCustomersLazyQuery();

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

  const formik = useFormikContext();

  const handleAddCustomer = (customer) => {
    if (customer) {
      formik.setFieldValue("customerId", customer.id);
      setCustomer(customer);
    }
  };

  const handleRemoveCustomer = () => {
    formik.setFieldValue("customerId", undefined);
    setCustomer(null);
  };

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
            handleAddCustomer(customer);
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
          <Avatar></Avatar>
          <Box ml={1}>
            <Typography variant="subtitle2">
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography variant="body2">{customer.email}</Typography>
            <Typography variant="body2">{customer.phoneNumber}</Typography>
          </Box>
          <Box>
            <IconButton size="small" onClick={handleRemoveCustomer}>
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
                  onClick={() => handleAddCustomer(option)}
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
