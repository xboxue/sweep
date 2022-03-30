import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { sortBy } from "lodash";
import {
  useGetMyCartQuery,
  useRemoveCartBookingsMutation,
  useUpdateCartBookingsMutation,
} from "../../generated/graphql";
import CartItem from "../CartItem/CartItem";

// const PriceListItem = ({ label, value, TypographyProps }: Props) => (
//   <Box display="flex" justifyContent="space-between">
//     <Typography {...TypographyProps}>{label}</Typography>
//     <Typography {...TypographyProps}>${(value / 100).toFixed(2)}</Typography>
//   </Box>
// );

const CartSummaryCard = () => {
  const { loading, error, data, refetch } = useGetMyCartQuery();
  const [removeCartBookings] = useRemoveCartBookingsMutation();
  const [updateCartBookings] = useUpdateCartBookingsMutation();

  if (loading) return <Skeleton />;

  if (!data?.myCart?.cartBookings?.length) {
    return null;
  }

  return (
    <>
      <Stack spacing={1} sx={{ mb: 1 }}>
        {sortBy(data.myCart.cartBookings, "id").map((cartBooking) => (
          <CartItem
            key={cartBooking.id}
            cartBooking={cartBooking}
            onRemove={async () => {
              try {
                await removeCartBookings({
                  variables: { input: { cartBookingIds: [cartBooking.id] } },
                });
                await refetch();
              } catch (error) {
                console.log(error);
              }
            }}
            onUpdate={async (numGuests) => {
              try {
                await updateCartBookings({
                  variables: {
                    input: {
                      cartBookings: [{ id: cartBooking.id, numGuests }],
                    },
                  },
                });
                await refetch();
              } catch (error) {
                console.log(error);
              }
            }}
          />
        ))}
      </Stack>

      <Divider />
      <Stack spacing="4px" sx={{ mt: 1 }}>
        <Typography variant="subtitle1" mt={1}>
          Pricing details
        </Typography>

        {/* <PriceListItem
          label={`${numGuests} × ${offering.name}`}
          value={price.subtotal}
        />
        <PriceListItem label="Taxes" value={price.tax} />
        <PriceListItem
          label="Total"
          value={price.total}
          TypographyProps={{ fontWeight: 500 }}
        /> */}
      </Stack>
    </>
  );
};

export default CartSummaryCard;
