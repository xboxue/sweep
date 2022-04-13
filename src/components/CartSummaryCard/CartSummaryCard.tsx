import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useGetMyCartQuery } from "../../generated/graphql";
import CartItemList from "../CartItemList/CartItemList";

interface Props {
  editable: boolean;
}

const CartSummaryCard = ({ editable }: Props) => {
  const { loading, error, data, refetch } = useGetMyCartQuery({
    fetchPolicy: "network-only",
  });

  if (loading) return <Skeleton />;

  return (
    <>
      <Stack spacing={1} sx={{ mb: 1, overflow: "auto" }}>
        <CartItemList
          cartBookings={data?.myCart?.cartBookings}
          onUpdate={refetch}
          editable={editable}
        />
      </Stack>

      <Divider />
      <Stack spacing="4px" sx={{ mt: 1 }}>
        <Typography variant="subtitle1" mt={1}>
          Pricing details
        </Typography>

        {[
          { label: "Subtotal", value: data.myCart.subtotal },
          { label: "Taxes", value: data.myCart.tax },
          { label: "Total", value: data.myCart.total, variant: "subtitle1" },
        ].map(({ label, value, ...props }) => (
          <Box display="flex" justifyContent="space-between" key={label}>
            <Typography variant="body2" {...props}>
              {label}
            </Typography>
            <Typography variant="body2" {...props}>
              ${(value / 100).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default CartSummaryCard;
