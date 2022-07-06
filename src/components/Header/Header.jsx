import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HeadsetIcon from "@mui/icons-material/Headset";

const styles = {
  logoWrapper: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  tube: {
    background: "red",
    padding: "1px",
    borderRadius: "5px",
  },
};

export default function ButtonAppBar() {
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
            <div style={styles.logoWrapper}>
              Tracks<span style={styles.tube}>Tube</span>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
