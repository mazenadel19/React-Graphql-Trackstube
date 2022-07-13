import { useContext } from "react";
import { PlayArrow, Save } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import { Pause } from "@mui/icons-material";

import { SongContext } from "../../context/SongsProvider";

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

  const handleSong = () => {
    songDispatch({
      type: songState.isPlaying ? "PAUSE_SONG" : "PLAY_SONG",
      song,
    });
  };

  const saveToQueue = () => {
    songDispatch({
      type: "SAVE_TO_QUEUE",
      song: { ...song, id: new Date().getTime() + "_" + song.id },
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
              onClick={handleSong}
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
      
            <IconButton
              size="small"
              color="primary"
              sx={styles.btnHover}
              onClick={saveToQueue}
              disabled={songState.queue.length === 5}
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
