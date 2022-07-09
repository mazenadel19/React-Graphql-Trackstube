import { useContext } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Slider, useMediaQuery } from "@mui/material";

import { btnHover } from "../SongList/Song";
import { Pause } from "@mui/icons-material";
import { SongContext } from "../../context/SongsProvider";

const styles = {
  card: { display: "flex", justifyContent: "space-around", m: 1, boxShadow: 3 },
  cardWrapper: { display: "flex", flexDirection: "column" },
  cardContent: { flex: "1 0 auto" },
  btnWrapper: { display: "flex", alignItems: "center", pl: 1, pb: 1 },
  playBtn: { height: 38, width: 38 },
  btnHover: btnHover[0],
  cardContentLessThan420: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gridColumnGap: "5px",
  },
  playerHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default function SongPlayer() {
  const { songState, songDispatch } = useContext(SongContext);
  const { song, isPlaying } = songState;
  const { artist, duration, thumbnail, title } = song;

  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const greaterThan420PX = useMediaQuery("(min-width:420px)");

  const hanndleTogglePlay = () => {
    songDispatch({ type: "TOGGLE_SONG" });
  };

  return (
    <Card
      sx={
        greaterThanMedium ? styles.card : { ...styles.card, mx: 0, mb: "15px" }
      }
    >
      <Box
        sx={
          greaterThan420PX
            ? styles.cardWrapper
            : { ...styles.cardWrapper, alignItems: "center" }
        }
      >
        <CardContent
          sx={
            greaterThan420PX
              ? styles.cardContent
              : styles.cardContentLessThan420
          }
        >
          <div style={greaterThan420PX ? {} : styles.playerHeader}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {artist}
            </Typography>
          </div>
          {!greaterThan420PX && (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={thumbnail}
              alt={`${title} song thumbnail`}
            />
          )}
        </CardContent>

        <Box sx={styles.btnWrapper}>
          <IconButton aria-label="previous" sx={styles.btnHover}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            aria-label="play/pause"
            sx={styles.btnHover}
            onClick={hanndleTogglePlay}
          >
            {isPlaying ? <Pause sx={styles.playBtn}/>:<PlayArrowIcon sx={styles.playBtn} />}
          </IconButton>
          <IconButton aria-label="next" sx={styles.btnHover}>
            <SkipNextIcon />
          </IconButton>
          <Typography variant="subtitle1" color="text.secondary" component="p">
            {duration}
          </Typography>
        </Box>
        <Slider type="range" min={0} max={1} step={0.01} size="small" />
      </Box>

      {greaterThan420PX && (
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={thumbnail}
          alt={`${title} song thumbnail`}
        />
      )}
    </Card>
  );
}
