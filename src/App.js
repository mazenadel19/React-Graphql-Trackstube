import { Grid } from "@mui/material";
import AddSong from "./components/AddSong/AddSong";
import Header from "./components/Header/Header";
import QueuedSongList from "./components/QueuedSongList/QueuedSongList";
import SongList from "./components/SongList/SongList";
import SongPlayer from "./components/SongPlayer/SongPlayer";

function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3} sx={{ mt: 0, px: 2 }}>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5}>
          <SongPlayer />
          <QueuedSongList />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
