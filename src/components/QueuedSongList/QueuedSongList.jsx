import { Typography } from "@mui/material";
import QueuedSong from "./QueuedSong";

const styles = {
  container: {
    margin: "10px 0",
  },
};

const dummySong = {
  title: "title",
  artist: "artist",
  thumbnail: "https://bit.ly/3a6SEZT",
};

const songsArray = Array.from({ length: 5 }, () => dummySong);

const QueuedSongList = () => {
  return (
    <div style={styles.container}>
      <Typography variant="button" color="text.secondary">
        queue (5)
      </Typography>
      {songsArray.map(({ title, artist, thumbnail }, index) => (
        <QueuedSong key={index} title={title} artist={artist} thumbnail={thumbnail}/>
      ))}
    </div>
  );
};

export default QueuedSongList;
