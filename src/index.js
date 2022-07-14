import ReactDOM from "react-dom/client";
import SongsProvider from "./context/SongsProvider";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import Theme from "./Theme";
import client from "./graphql/client";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SongsProvider>
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </SongsProvider>
);
