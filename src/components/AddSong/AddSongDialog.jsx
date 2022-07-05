import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const sty = {
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
};

function AddSongDialog({ song, showDialog, setShowDialog }) {
  const { thumbnail, duration, title, artist, url } = song;

  function handleCloseDialog() {
    return setShowDialog(false);
  }

  return (
    <Dialog open={showDialog} onClose={handleCloseDialog} style={sty.dialog}>
      <DialogTitle>Edit Song</DialogTitle>

      <DialogContent>
        <img src={thumbnail} alt="song thumbnail" style={sty.thumbnail} />
        <TextField
          variant="standard"
          margin="dense"
          name="title"
          label="Title"
          value={title}
          fullWidth
        />
        <TextField
          variant="standard"
          margin="dense"
          name="artist"
          label="Artist"
          value={artist}
          fullWidth
        />
        <TextField
          variant="standard"
          margin="dense"
          name="thumbnail"
          label="Thumbnail"
          value={thumbnail}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button color="primary" variant="outlined">
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSongDialog;
