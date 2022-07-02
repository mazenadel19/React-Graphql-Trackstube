import { Grid } from "@mui/material";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import QueuedSongList from "./components/QueuedSongList";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";

function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5} >
          <SongPlayer />
          <QueuedSongList />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
