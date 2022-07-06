import { useContext } from "react";
import { SongContext } from "../../context/SongsProvider";

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

const styles = {
  card: { display: "flex", justifyContent: "space-around", m: 1, boxShadow: 3 },
  cardWrapper: { display: "flex", flexDirection: "column" },
  cardContent: { flex: "1 0 auto" },
  btnWrapper: { display: "flex", alignItems: "center", pl: 1, pb: 1 },
  playBtn: { height: 38, width: 38 },
  btnHover: btnHover[0],
};

export default function SongPlayer() {
  const { songsState } = useContext(SongContext);
  const { song } = songsState;
  const { artist, duration,  thumbnail, title,  } = song;
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const minWidth420 = useMediaQuery("(min-width:420px)");

  return (
    <Card
      sx={
        greaterThanMedium ? styles.card : { ...styles.card, mx: 0, mb: "15px" }
      }
    >
      <Box sx={styles.cardWrapper}>
        <CardContent sx={styles.cardContent}>
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
        </CardContent>

        <Box sx={styles.btnWrapper}>
          <IconButton aria-label="previous" sx={styles.btnHover}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="play/pause" sx={styles.btnHover}>
            <PlayArrowIcon sx={styles.playBtn} />
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

      {minWidth420 && (
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
