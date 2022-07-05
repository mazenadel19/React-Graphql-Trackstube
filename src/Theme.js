import { createTheme } from "@mui/material";
import { lightBlue, blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: blueGrey,
    secondary: lightBlue,
  },
});

export default theme;
