import { Box, Typography, TypographyProps } from "@mui/material";

interface Props {
  subtotal: number;
  total: number;
  tax: number;
}
const PaymentSummary = ({ subtotal, tax, total }: Props) => {
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
    </>
  );
};

export default PaymentSummary;
