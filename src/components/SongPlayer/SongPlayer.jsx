import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Slider } from "@mui/material";
import { btnHover } from "../SongList/Song";

const dummySong = {
  title: "title",
  artist: "artist",
  thumbnail: "https://bit.ly/3a6SEZT",
};

const styles = {
  card: { display: "flex", justifyContent: "space-around", m: 1, boxShadow: 3 },
  cardWrapper: { display: "flex", flexDirection: "column" },
  cardContent: { flex: "1 0 auto" },
  btnWrapper: { display: "flex", alignItems: "center", pl: 1, pb: 1 },
  playBtn: { height: 38, width: 38 },
  btnHover: btnHover[0],
};

export default function SongPlayer() {
  return (
    <Card sx={styles.card}>
      <Box sx={styles.cardWrapper}>
        <CardContent sx={styles.cardContent}>
          <Typography component="div" variant="h5">
            {dummySong.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {dummySong.artist}
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
            <SkipNextIcon  />
          </IconButton>
          <Typography variant="subtitle1" color="text.secondary" component="p">
            00:01:30
          </Typography>
        </Box>
        <Slider type="range" min={0} max={1} step={0.01} size="small" />
      </Box>

      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={dummySong.thumbnail}
        alt={`${dummySong.title} album cover`}
      />
    </Card>
  );
}
