import { useMutation } from "@apollo/client";

import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";

import { ADD_OR_REMOVE_FROM_QUEUE } from "../../graphql/mutations";

const styles = {
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
    backgroundColor: "#1e1e1e",
    padding: "5px",
    borderRadius: "4px",
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  thumbnail: { width: "44px", height: "44px" },
  text: { textOverflow: "ellipsis", overflow: "hidden" },
};

export default function QueuedSong({ song }) {
  const { title, artist, thumbnail } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  const removeFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };

  return (
    <div style={styles.container}>
      <Avatar src={thumbnail} sx={styles.thumbnail} />
      <div style={styles.songInfoContainer}>
        <Typography variant="subtitle2" sx={styles.text}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={styles.text}>
          {artist}
        </Typography>
      </div>
      <IconButton onClick={removeFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
