import { useContext } from "react";

import { useMutation } from "@apollo/client";

import { PlayArrow, Save, Pause } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { SongContext } from "../../context/SongsProvider";

import { ADD_OR_REMOVE_FROM_QUEUE } from "../../graphql/mutations";

export const btnHover = [
  (theme) => ({
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  }),
];

const styles = {
  songInfoContainer: { display: "flex", alignItems: "center" },
  songInfo: { display: "flex", justifyContent: "space-between", width: "100%" },
  thumbnail: { objectFit: "cover", width: 140, height: 140 },
  btnHover,
};

export default function Song({ song }) {
  const { songState, songDispatch } = useContext(SongContext);
  const { title, artist, thumbnail, id } = song;

  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  const playPauseSong = () => {
    songDispatch({
      type:
        songState?.song?.id === id && songState.isPlaying
          ? "PAUSE_SONG"
          : "PLAY_SONG",
      song,
    });
  };

  const saveOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };

  return (
    <Card sx={{ m: 3 }}>
      <div style={styles.songInfoContainer}>
        <CardMedia image={thumbnail} sx={styles.thumbnail} />

        <div style={styles.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="text.secondary">
              {artist}
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton
              onClick={playPauseSong}
              size="small"
              color="primary"
              sx={styles.btnHover}
            >
              {songState?.song?.id === id && songState.isPlaying ? (
                <Pause />
              ) : (
                <PlayArrow />
              )}
            </IconButton>

            {greaterThanMedium && (
              <IconButton
                size="small"
                color="primary"
                sx={styles.btnHover}
                onClick={saveOrRemoveFromQueue}
              >
                <Save />
              </IconButton>
            )}
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
