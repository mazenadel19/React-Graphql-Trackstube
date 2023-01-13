import { useState } from "react";
// Components
import AddSongDialog from "./AddSongDialog";
import YtPlayer from "../YouTube/YtPlayer";
// Hook
import useFetchSongInfo from "../../hooks/useFetchSongInfo";
// MUI
import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, InputAdornment, TextField, Box, Stack } from "@mui/material";
// lib
import YouTubePlayer from "react-player/youtube";

const styles = {
  addBtn: [
    { m: 1 },
    (theme) => ({
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    }),
  ],
};


const AddSong = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [playable, setPlayable] = useState(false);
  const { song, setSong, handleFetchSongData } = useFetchSongInfo(url)

  const HandleAddInput = (e) => {
    setUrl(e.target.value);
    const IsPlayable = YouTubePlayer.canPlay(e.target.value);
    setPlayable(IsPlayable);
  };


  return (
    <Stack display={"flex"} alignItems="center" flexDirection={"row"}>
      <AddSongDialog
        song={song}
        setSong={setSong}
        setUrl={setUrl}
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      />

      <TextField
        onChange={HandleAddInput}
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

      <Box display={"none"}>
        <YtPlayer url={url} handleEditSong={handleFetchSongData} />
      </Box>
    </Stack>
  );
};

export default AddSong;
