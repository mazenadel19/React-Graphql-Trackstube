import { useMutation } from "@apollo/client";
// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// Components
import { ADD_SONG } from "../../graphql/mutations";
// Context
import { initialSongState } from "./AddSong";

const sty = {
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
};

function AddSongDialog({ song, setSong, showDialog, setShowDialog, setUrl }) {
  const { thumbnail, title, artist } = song;
  const [addSong] = useMutation(ADD_SONG);

  const handleCloseDialog = () => {
    return setShowDialog(false);
  };

  const handleEditSong = (e) => {
    setSong((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSongButton = async () => {
    try {
      const { artist, duration, title, url, thumbnail } = song;
      await addSong({
        variables: {
          artist: artist.length ? artist : null,
          duration: duration ? duration : null,
          title: title.length ? title : null,
          url: url.length ? url : null,
          thumbnail: thumbnail.length ? thumbnail : null,
        },
      });
      setSong(initialSongState);
      setUrl("");
      handleCloseDialog();
    } catch (err) {
      console.warn("Couldn't Add Your Stupid Song", song);
      console.error(err);
    }
  };

  return (
    <Dialog open={showDialog} onClose={handleCloseDialog} style={sty.dialog}>
      <DialogTitle>Edit Song</DialogTitle>

      <DialogContent>
        <img src={thumbnail} alt="song thumbnail" style={sty.thumbnail} />
        <TextField
          onChange={handleEditSong}
          variant="standard"
          margin="dense"
          name="title"
          label="Title"
          value={title}
          fullWidth
          error={!song["title"]}
          helperText={!song["title"] && "Fill out this field"}
        />
        <TextField
          onChange={handleEditSong}
          variant="standard"
          margin="dense"
          name="artist"
          label="Artist"
          value={artist}
          fullWidth
          error={!song["artist"]}
          helperText={!song["artist"] && "Fill out this field"}
        />
        <TextField
          onChange={handleEditSong}
          variant="standard"
          margin="dense"
          name="thumbnail"
          label="Thumbnail"
          value={thumbnail}
          fullWidth
          error={!song["thumbnail"]}
          helperText={!song["thumbnail"] && "Fill out this field"}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleAddSongButton}
        >
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSongDialog;
