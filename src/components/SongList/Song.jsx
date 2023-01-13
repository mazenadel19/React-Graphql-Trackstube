import { useContext } from "react";
// Apollo
import { useMutation } from "@apollo/client";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../../graphql/mutations";
// Context
import { SongContext } from "../../context/SongsProvider";
// MUI
import { PlayArrow, Save, Pause } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia,Grid,IconButton, Stack, Typography, } from "@mui/material";
// Helper
import useHelper from "../hooks/useHelper";

export const btnHover = 
  (theme) => ({
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  });


export default function Song({ song }) {
  const { songState, songDispatch } = useContext(SongContext);
  const { title, artist, thumbnail, id } = song;
  const { greaterThanMedium } = useHelper()


  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  const playPauseSong = () => {
    songDispatch({
      type: songState?.song?.id === id && songState.isPlaying ? "PAUSE_SONG" : "PLAY_SONG",
      song
    });
  };

  const saveOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };

  return (
    <Card sx={{ m: 3 }}>
      <Stack display="flex" flexDirection={"row"} alignItems={"center"}>
        <CardMedia image={thumbnail} sx={{ objectFit: "cover", width: 140, height: 140 }}/>

        <Grid container justifyContent={"space-between"}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="text.secondary">
              {artist}
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton
              onClick={playPauseSong}
              size="small"
              color="primary"
              sx={btnHover}
            >
              {songState?.song?.id === id && songState.isPlaying ? (<Pause />) : ( <PlayArrow />)}
            </IconButton>

            {greaterThanMedium && (
              <IconButton
                size="small"
                color="primary"
                sx={btnHover}
                onClick={saveOrRemoveFromQueue}
              >
                <Save />
              </IconButton>
            )}
          </CardActions>
        </Grid>
      </Stack>
    </Card>
  );
}
