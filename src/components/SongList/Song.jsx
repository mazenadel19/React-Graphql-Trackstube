import { PlayArrow, Save } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

export const btnHover = [
  (theme) => ({
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  }),
]

const styles = {
  songInfoContainer: { display: "flex", alignItems: "center" },
  songInfo: { display: "flex", justifyContent: "space-between", width: "100%" },
  thumbnail: { objectFit: "cover", width: 140, height: 140 },
  btnHover
};

export default function Song({ title, artist, thumbnail }) {
  return (
    <Card sx={{ m: 3 }}>
      <div style={styles.songInfoContainer}>
        <CardMedia image={thumbnail} sx={styles.thumbnail} />
        
        <div style={styles.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="text.secondary"
            >
              {artist}
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton size="small" color="primary" sx={styles.btnHover}>
              <PlayArrow />
            </IconButton>
            <IconButton size="small" color="primary" sx={styles.btnHover}>
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
