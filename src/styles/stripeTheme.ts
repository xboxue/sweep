import theme from "./theme";

const stripeTheme = {
  fonts: [
    {
      family: "Roboto",
      cssSrc:
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    },
  ],
  appearance: {
    variables: { fontFamily: theme.typography.fontFamily },
    rules: { ".Label": { ...theme.typography.subtitle2 } },
  },
};

export default stripeTheme;
