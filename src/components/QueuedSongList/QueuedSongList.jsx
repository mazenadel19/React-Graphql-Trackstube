// Apollo
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from "../../graphql/queries";
// Component
import QueuedSong from "./QueuedSong";
// MUI
import { Box, Typography } from "@mui/material";

const QueuedSongList = () => {
  const { data } = useQuery(GET_QUEUED_SONGS);

  return (
    <Box marginY={"10px"}>
      <Typography variant="button" color="text.secondary">
        queue ({data.queue.length})
      </Typography>
      {data.queue.map((song) => (
        <QueuedSong key={song.id} song={song} />
      ))}
    </Box>
  );
};

export default QueuedSongList;
