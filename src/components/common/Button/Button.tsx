import { Button as MuiButton, styled } from "@mui/material";

const Button = styled(MuiButton)(({ theme, variant, color }) => ({
  ...(variant === "contained" &&
    !color && {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      fontSize: 14,
      border: `1px solid rgba(186, 191, 195, 1)`,
      borderBottomColor: "rgba(186, 191, 196, 1)",
      boxShadow: "0 1px 0 rgba(0, 0, 0, 0.05)",
      "&:hover": {
        background: "rgba(246, 246, 247, 1)",
      },
    }),
}));

export default Button;
