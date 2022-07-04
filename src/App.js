import { Grid, Hidden, useMediaQuery } from "@mui/material";
import AddSong from "./components/AddSong/AddSong";
import Header from "./components/Header/Header";
import QueuedSongList from "./components/QueuedSongList/QueuedSongList";
import SongList from "./components/SongList/SongList";
import SongPlayer from "./components/SongPlayer/SongPlayer";

const styles = {
  wrapper: { backgroundColor: "#2a2a2a" },
  containerDesktop: {
    px: 2,
    pt: 11,
  },
  containerMobile: {
    pt: 2,
  },
  rightSection: {
    common: {
      position: "fixed",
      width: "100%",
    },
    mobile: {
      left: 0,
      bottom: 0,
    },
    desktop: {
      right: 0,
      top: 60,
    },
  },
};

function App() {
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const greaterThanSmall = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );

  return (
    <div style={styles.wrapper}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid
        container
        spacing={3}
        sx={greaterThanSmall ? styles.containerDesktop : styles.containerMobile}
      >
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={
            greaterThanMedium
              ? {
                  ...styles.rightSection.desktop,
                  ...styles.rightSection.common,
                }
              : {
                  ...styles.rightSection.mobile,
                  ...styles.rightSection.common,
                }
          }
        >
          <SongPlayer />
          {greaterThanMedium && <QueuedSongList />}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
