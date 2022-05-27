import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
  },

  palette: {
    primary: {
      main: "#272739",
    },
    secondary: {
      main: colors.amber[200],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: ["none"],
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
