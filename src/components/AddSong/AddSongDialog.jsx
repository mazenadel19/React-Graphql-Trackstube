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

function AddSongDialog({ showDialog,setShowDialog }) {
  
  function handleCloseDialog() {
    return setShowDialog(false);
  }

  return (
    <Dialog open={showDialog} onClose={handleCloseDialog} style={sty.dialog}>
      <DialogTitle>Edit Song</DialogTitle>

      <DialogContent>
        <img
          src="https://bit.ly/3a6SEZT"
          alt="song thumbnail"
          style={sty.thumbnail}
        />
        <TextField
          variant="standard"
          margin="dense"
          name="title"
          label="Title"
          fullWidth
        />
        <TextField
          variant="standard"
          margin="dense"
          name="artist"
          label="Artist"
          fullWidth
        />
        <TextField
          variant="standard"
          margin="dense"
          name="thumbnail"
          label="Thumbnail"
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button  color="primary" variant="outlined">
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSongDialog;
