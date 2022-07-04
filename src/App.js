import { Grid } from "@mui/material";
import AddSong from "./components/AddSong/AddSong";
import Header from "./components/Header/Header";
import QueuedSongList from "./components/QueuedSongList/QueuedSongList";
import SongList from "./components/SongList/SongList";
import SongPlayer from "./components/SongPlayer/SongPlayer";

const styles = {
  leftSection: {
    px: 2,
    marginTop: 8,
  },
  rightSection: [
    (theme) => ({
      [theme.breakpoints.down("md")]: {
      },
      [theme.breakpoints.up("md")]: {
        position: "fixed",
        width: "100%",
        right: 0,
        top: 60,
      },
    }),
  ],
};

function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3} sx={styles.leftSection}>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5} sx={styles.rightSection}>
          <SongPlayer />
          <QueuedSongList />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
