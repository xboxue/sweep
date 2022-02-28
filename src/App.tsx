import { ApolloProvider } from "@apollo/client";
import { LocalizationProvider } from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AdminApp from "./components/AdminApp/AdminApp";
import client from "./services/apolloClient";
import { store } from "./store";
import theme from "./styles/theme";

const App = () => {
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
