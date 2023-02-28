import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LocalUsersContextProvider from "./Context/LocalUsersContextProvider";
import LoginContextProvider from "./Context/LoginContextProvider";
// import OffersContextProvider from "./Context/OffersContextProvider";
// import RequestsContextProvider from "./Context/RequestsContextProvider";
import HistoryContextProvider from "./Context/HistoryContextProvider";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  palette: {
    primary: {
      main: `#ff8000`, //כתום
      darker: '#cc6600',
    },
    secondary: {
      main: `#d1086b`,//סגול
      darker: '#92054a'
    },
    success: {
      main: `#f5f5f5`,//אפרפר
    },
    error: {
      main: `#ff0000`, // אדום
    },
    warning: {
      main: `#2E7397`, // טורקיז עדין
    },
    info: {
      main: `#3399ff`, // תחלת
      darker: '#053e85',
    },
    green:{
      main: `#43ba0e`,
    }

  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },

  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#d1086b"
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#ff8000"
          }
        },
        track: {
          // Controls default (unchecked) color for the track
          backgroundColor: "#d1086b",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 0.7,
            backgroundColor: "#ff8000"
          }
        }
      }
    }
  }
});

root.render(
  <LocalUsersContextProvider>
    <LoginContextProvider>
      <HistoryContextProvider>
        <BrowserRouter>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </CacheProvider>
        </BrowserRouter>
      </HistoryContextProvider>
    </LoginContextProvider>
  </LocalUsersContextProvider>
);
