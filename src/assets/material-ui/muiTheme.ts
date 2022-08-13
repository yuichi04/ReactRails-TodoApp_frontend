import { createTheme } from "@mui/material/styles";

const MuiTheme = createTheme({
  palette: {
    common: {
      black: "#333",
      white: "#fff",
    },
    primary: {
      main: "#33b6b1",
      dark: "#333",
      contrastText: "#fff",
    },
    secondary: {
      main: "#71a5f3",
      dark: "#333",
      contrastText: "#fff",
    },
    background: {
      paper: "#f8fbfe",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
});

export default MuiTheme;
