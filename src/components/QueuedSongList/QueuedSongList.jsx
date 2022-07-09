import { Typography } from "@mui/material";
import { useContext } from "react";
import { SongContext } from "../../context/SongsProvider";
import QueuedSong from "./QueuedSong";

const styles = {
  container: {
    margin: "10px 0",
  },
};

const QueuedSongList = () => {
  const { songState } = useContext(SongContext);

  return (
    <div style={styles.container}>
      <Typography variant="button" color="text.secondary">
        queue ({songState.queue.length})
      </Typography>
      {songState.queue.map((song) => (
        <QueuedSong key={song.id} song={song} />
      ))}
    </div>
  );
};

export default QueuedSongList;
