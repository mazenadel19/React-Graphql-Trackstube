import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";

const styles = {
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
    // backgroundColor: "#1e1e1e",
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  thumbnail: { width: "44px", height: "44px" },
  text: { textOverflow: "ellipsis", overflow: "hidden" },
};

export default function QueuedSong({ title, artist, thumbnail }) {
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
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
