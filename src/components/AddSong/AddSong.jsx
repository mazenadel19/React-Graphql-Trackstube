import ReactDOM from "react-dom";
import { useState } from "react";

import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";

import AddSongDialog from "./AddSongDialog";

import YouTubePlayer from "react-player/youtube";
import Iframe from "./Iframe";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  addBtn: [
    { m: 1 },
    (theme) => ({
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    }),
  ],
};

const initialSongState = {
  thumbnail: "",
  duration: 0,
  title: "",
  artist: "",
  url: "",
};

const AddSong = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(initialSongState);
  const HandleAddSongsInput = (e) => {
    setUrl(e.target.value);
    const IsPlayable = YouTubePlayer.canPlay(e.target.value);
    setPlayable(IsPlayable);
  };

  const handleEditSong = ({ player }) => {
    const nestedPlayer = player.player.player;
    const { video_id, title, author } = nestedPlayer.getVideoData();
    const duration = nestedPlayer.getDuration();
    const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
    setSong({ thumbnail, duration, title, artist: author, url });
  };

  return (
    <div style={styles.container}>
      <AddSongDialog
        song={song}
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      />

      <TextField
        onChange={HandleAddSongsInput}
        value={url}
        sx={{ m: 1 }}
        placeholder="Add Youtube URL"
        fullWidth
        margin="normal"
        type="url"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end" sx={{ mr: 1 }}>
              <Link />
            </InputAdornment>
          ),
        }}
      />

      <Button
        disabled={!playable}
        sx={styles.addBtn}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setShowDialog(true)}
      >
        Add
      </Button>

      {playable &&
        ReactDOM.createPortal(
          <Iframe
            playable={playable}
            url={url}
            handleEditSong={handleEditSong}
          />,
          document.getElementById("iframe-root")
        )}
    </div>
  );
};

export default AddSong;
