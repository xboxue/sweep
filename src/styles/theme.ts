import { createTheme, responsiveFontSizes } from "@mui/material";

const baseTheme = responsiveFontSizes(
  createTheme({
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
      MuiMenuItem: {
        defaultProps: {
          dense: true,
        },
      },
    },
  })
);
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
          transitionDuration: 100,
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
      MuiPopover: {
        defaultProps: {
          elevation: 1,
          transitionDuration: 100,
        },
        styleOverrides: {
          paper: {
            marginTop: baseTheme.spacing(1),
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "contained", color: "background" },
            style: {
              border: `1px solid rgba(186, 191, 195, 1)`,
              borderBottomColor: "rgba(186, 191, 196, 1)",
              boxShadow: "0 1px 0 rgba(0, 0, 0, 0.05)",
              "&:hover": {
                background: "rgba(246, 246, 247, 1)",
              },
            },
          },
        ],
      },
    },
  },
  baseTheme
);

export default theme;
