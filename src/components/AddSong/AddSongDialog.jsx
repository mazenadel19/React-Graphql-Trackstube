import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { ADD_SONG } from "../../graphql/mutations";
import { GET_SONGS } from "../../graphql/queries";

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
  const [addSong, { error }] = useMutation(ADD_SONG,
    {
      refetchQueries: [
        { query: GET_SONGS }
      ]
    });

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
      console.log("Couldn't Add Your Stupid Song", song);
      console.warn(err);
    }
  };

  const handleInputError = (field) => {
    return error?.graphQLErrors[0]?.extensions?.path?.includes(field);
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
          error={handleInputError("title")}
          helperText={handleInputError("title") && "Fill out this field"}
        />
        <TextField
          onChange={handleEditSong}
          variant="standard"
          margin="dense"
          name="artist"
          label="Artist"
          value={artist}
          fullWidth
          error={handleInputError("artist")}
          helperText={handleInputError("artist") && "Fill out this field"}
        />
        <TextField
          onChange={handleEditSong}
          variant="standard"
          margin="dense"
          name="thumbnail"
          label="Thumbnail"
          value={thumbnail}
          fullWidth
          error={handleInputError("thumbnail")}
          helperText={handleInputError("thumbnail") && "Fill out this field"}
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
