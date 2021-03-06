import { ApolloProvider } from "@apollo/client";
import { LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AdminApp from "./components/AdminApp/AdminApp";
import client from "./services/apolloClient";
import publicClient from "./services/apolloClientPublic";
import { store } from "./store";
import theme from "./styles/theme";
import WidgetApp from "./widgets/WidgetApp";

const App = () => {
  if (window.location.pathname.startsWith("/widget"))
    return (
      <>
        <CssBaseline />
        <GlobalStyles styles={{ body: { background: "none" } }} />
        <ApolloProvider client={publicClient}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <BrowserRouter>
                <WidgetApp />
              </BrowserRouter>
            </LocalizationProvider>
          </ThemeProvider>
        </ApolloProvider>
      </>
    );

  return (
    <>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <BrowserRouter>
                <AdminApp />
              </BrowserRouter>
            </LocalizationProvider>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default App;
