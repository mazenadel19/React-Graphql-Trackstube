// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HeadsetIcon from "@mui/icons-material/Headset";
import { Stack } from "@mui/material";

// styles
import styles from "./Header.module.css"

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HeadsetIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <Stack display={"flex"} flexDirection="row" alignItems={"center"} gap={"5px"}> 
              Tracks 
              <Typography component="span" variant="h6" className={styles.tube}>Tube</Typography>
            </Stack>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
