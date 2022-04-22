import { Box, Divider, Typography, TypographyProps } from "@mui/material";

interface Props {
  subtotal: number;
  total: number;
  tax: number;
  totalPaid?: number;
}
const PaymentSummary = ({ subtotal, tax, total, totalPaid }: Props) => {
  const lines: ({ label: string; value: number } & TypographyProps)[] = [
    { label: "Subtotal", value: subtotal },
    { label: "Taxes", value: tax },
    { label: "Total", value: total, variant: "subtitle1" },
  ];

  return (
    <>
      {lines.map(({ label, value, ...props }) => (
        <Box display="flex" justifyContent="space-between" key={label}>
          <Typography variant="body2" {...props}>
            {label}
          </Typography>
          <Typography variant="body2" {...props}>
            ${(value / 100).toFixed(2)}
          </Typography>
        </Box>
      ))}
      {(totalPaid || totalPaid === 0) && (
        <>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">Paid by customer</Typography>
            <Typography variant="body2">
              ${(totalPaid / 100).toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default PaymentSummary;
