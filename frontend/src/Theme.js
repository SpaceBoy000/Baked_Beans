import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17215E",
    },
    secondary: {
      main: "#f4b52d",
    },
    text: {
      primary: "#17215E",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    body1: {
      fontSize: 25,
    },
    body2: {
      fontSize: 16,
    },
    body5: {
      fontSize: 35,
      color: "rgb(123,63,228)",
      fontWeight: 700,
    },
    body6: {
      fontSize: 35,
      color: "rgb(123,63,228)",
      fontWeight: 700,
    },
    body7: {
      fontSize: 14,
      color: "rgb(123,63,228)",
      fontWeight: 700,
    },
    allVariants: {
      color: "#0648ca",
    },
    h4: {
      fontWeight: 600,
      fontSize: 32,
    },
    h5: {
      fontSize: 24,
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "6px 6px 20px 6px #00000096",
          borderRadius: 20,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 400,
          fontSize: "1.2rem",
          padding: "10px",
          minWidth: 138,
        },
        contained: {
          boxShadow: "6px 6px 20px 6px #00000096",
        },
        containedSecondary: {
          color: "#17215E",
        },
      },
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
