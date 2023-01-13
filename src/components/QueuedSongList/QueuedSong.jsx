// Apollo
import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../../graphql/mutations";
// MUI
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
// Styles
import classes from "./QueuedSongList.module.css"
import { Box } from "@mui/system";

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
    <Box className={classes.container}>
      <Avatar src={thumbnail} className={classes.thumbnail} />
      <Box className={classes.songInfoContainer}>
        <Typography variant="subtitle2" className={classes.text}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className={classes.text}>
          {artist}
        </Typography>
      </Box>
      <IconButton onClick={removeFromQueue}>
        <Delete color="error" />
      </IconButton>
    </Box>
  );
}
