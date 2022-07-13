import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { GET_QUEUED_SONGS } from "../../graphql/queries";
import QueuedSong from "./QueuedSong";

const styles = {
  container: {
    margin: "10px 0",
  },
};

const QueuedSongList = () => {
  const { data } = useQuery(GET_QUEUED_SONGS);
  
  return (
    <div style={styles.container}>
      <Typography variant="button" color="text.secondary">
        queue ({data.queue.length})
      </Typography>
      {data.queue.map((song) => (
        <QueuedSong key={song.id} song={song} />
      ))}
    </div>
  );
};

export default QueuedSongList;
