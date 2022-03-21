import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "San Francisco",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
});

export default createTheme(
  {
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up("sm")]: { minHeight: 56 },
          },
        },
      },
    },
  },
  theme
);
