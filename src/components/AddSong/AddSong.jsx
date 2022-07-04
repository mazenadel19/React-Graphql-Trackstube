import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { btnHover } from "../SongList/Song";
import AddSongDialog from "./AddSongDialog";

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

const AddSong = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div style={styles.container}>
      <AddSongDialog showDialog={showDialog} setShowDialog={setShowDialog} />

      <TextField
        sx={{ m: 1 }}
        placeholder="Add Youtube or Soundcloud URL"
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
        sx={styles.addBtn}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setShowDialog(true)}
      >
        Add
      </Button>
    </div>
  );
};

export default AddSong;
