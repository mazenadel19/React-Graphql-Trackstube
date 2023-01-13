import { useContext, useRef, useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from "../../graphql/queries";
// Components
import { SongContext } from "../../context/SongsProvider";
import MediaPlayerPortal from "./MediaPlayerPortal"
// hooks
import useHelper from "../hooks/useHelper";
// MUI
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Pause, PlayArrow, SkipPrevious, SkipNext } from "@mui/icons-material";
import { Slider } from "@mui/material";

// styles
import classes from "./SongPlayer.module.css";
import { btnHover } from "../SongList/Song";
import useSongPlayer from "../hooks/useSongPlayer";


export default function SongPlayer() {
  const { greaterThan420PX, greaterThanMedium, formatDuration } = useHelper();
  const { songState: { song, isPlaying }, songDispatch } = useContext(SongContext);

  const { data } = useQuery(GET_QUEUED_SONGS);
  const { played, setPlayed, playedSeconds, setPlayedSeconds } = useSongPlayer(data)

  const [seeking, setSeeking] = useState(false);
  const YtPlayerRef = useRef(null);

  if (!song) return null;

  const { artist, thumbnail, title, url } = song;

  const hanndleTogglePlay = () => {
    songDispatch({ type: "TOGGLE_SONG" });
  };

  const handleProgressChange = (e, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekingMouseDown = () => {
    setSeeking(true);
  };
  const handleSeekingMouseUp = () => {
    setSeeking(false);
    YtPlayerRef.current.seekTo(played);
  };


  const currentSongIdx = data.queue.findIndex((s) => s.id === song.id);
  const previousSong = data.queue[currentSongIdx - 1];
  const LastSong = data.queue[data.queue.length - 1];

  const handlePlayPrevious = () => {
    if (previousSong || LastSong)
      songDispatch({
        type: "PLAY_SONG",
        song: previousSong ? previousSong : LastSong,
      });
  };

  const nextSong = data.queue[currentSongIdx + 1];
  const FirstSong = data.queue[0];
  const handlePlayNext = () => {
    if (nextSong || FirstSong)
      songDispatch({ type: "PLAY_SONG", song: nextSong ? nextSong : FirstSong });
  };


  return (
    <>
      <Card className={greaterThanMedium ? classes.card : `${classes.card} ${classes.cardBiggerThanMd}`}>
        <Box className={greaterThan420PX ? classes.cardWrapper : `${classes.cardWrapper} ${classes.cardWrapperAlignCenter}`}>

          <CardContent className={greaterThan420PX ? classes.cardContent : classes.cardContentLessThan420}>
            <Box className={greaterThan420PX ? "" : classes.cardContentHeaderLessThan420}>
              <Box className={greaterThan420PX ? "" : classes.playerTitle}>
                <Typography component='div' variant='h5' >{title}</Typography>
                <Typography variant='subtitle1' color='text.secondary' component='div'>{artist}</Typography>
              </Box>
              {!greaterThan420PX && <CardMedia component='img' sx={{ width: 151 }} image={thumbnail} alt={`${title} song thumbnail`} />}
            </Box>

            <Box className={classes.btnWrapper}>
              <IconButton aria-label='previous' sx={btnHover} onClick={handlePlayPrevious} disabled={!previousSong && !LastSong}>
                <SkipPrevious />
              </IconButton>
              <IconButton aria-label='play/pause' sx={btnHover} onClick={hanndleTogglePlay}>
                {isPlaying ? (<Pause className={classes.playBtn} />) : (<PlayArrow className={classes.playBtn} />)}
              </IconButton>
              <IconButton aria-label='next' sx={btnHover} onClick={handlePlayNext} disabled={!FirstSong && !nextSong}>
                <SkipNext />
              </IconButton>
              <Typography variant='subtitle1' color='text.secondary' component='p'>
                {formatDuration(playedSeconds)}
              </Typography>
            </Box>

            <Slider
              onChange={handleProgressChange} value={played}
              onMouseDown={handleSeekingMouseDown} onMouseUp={handleSeekingMouseUp}
              type='range' min={0} max={1} step={0.01} size='small'
            />
          </CardContent>

        </Box>

        {greaterThan420PX && <CardMedia component='img' sx={{ width: 151 }} image={thumbnail} alt={`${title} song thumbnail`} />}
      </Card>
      <MediaPlayerPortal url={url} isPlaying={isPlaying} setPlayed={setPlayed} setPlayedSeconds={setPlayedSeconds} seeking={seeking} ref={YtPlayerRef} />
    </>
  );
}
