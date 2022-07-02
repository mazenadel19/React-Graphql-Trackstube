import { createTheme } from "@mui/material";
import { deepOrange, grey, purple, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    // primary: {
    //   main: teal[500],
    //   dark: teal[700],
    // },
    // secondary: {
    //   main: purple[500],
    //   dark: purple[700],
    // },
    // palette values for dark mode
    // primary: teal,
    // divider: purple[700],
    background: {
    //   default: purple[900],
      paper: teal[700],
    },
    // text: {
    //   primary: "#fff",
    //   secondary: grey[500],
    // },
  },
});

export default theme;
