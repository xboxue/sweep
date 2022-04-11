import { createTheme } from "@mui/material";

const baseTheme = createTheme({
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
    MuiPopover: {
      defaultProps: {
        elevation: 1,
      },
    },
  },
});
baseTheme.shadows[1] =
  "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px";

const theme = createTheme(
  {
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            [baseTheme.breakpoints.up("sm")]: { minHeight: 56 },
          },
        },
      },
      MuiMenu: {
        defaultProps: {
          elevation: 1,
        },
        styleOverrides: {
          root: {
            maxHeight: 300,
          },
          paper: {
            marginTop: baseTheme.spacing(1),
          },
        },
      },
    },
  },
  baseTheme
);

export default theme;
