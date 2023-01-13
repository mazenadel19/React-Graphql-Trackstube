import { useContext, useRef, useState, useEffect } from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from "../../graphql/queries";
import client from "../../graphql/client";
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


export default function SongPlayer() {
  const { greaterThan420PX, greaterThanMedium, formatDuration } = useHelper();

  const { data } = useQuery(GET_QUEUED_SONGS);

  const { songState, songDispatch } = useContext(SongContext);
  const { song, isPlaying } = songState;

  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const YtPlayerRef = useRef(null);

  useEffect(() => {
    const currentSongIdx = data.queue.findIndex((s) => s.id === song.id);
    const nextSong = data.queue[currentSongIdx + 1];

    if (nextSong && played >= 0.99) {
      songDispatch({ type: "PLAY_SONG", song: nextSong });
    } else if (data.queue.length && played >= 0.99) {
      songDispatch({ type: "PLAY_SONG", song: data.queue[0] });
    } else if (!nextSong && played >= 0.99) {
      songDispatch({ type: "TOGGLE_SONG" });
    }
    if (played >= 0.99) {
      setPlayed(0);
      setPlayedSeconds(0);

      const queryResult = client.readQuery({ query: GET_QUEUED_SONGS });
      if (queryResult) {
        const { queue } = queryResult;
        if (queue.length) {
          const nextSongIdx = currentSongIdx + 1;
          const queueCopy = [...queue]; // queue is immutable
          // removes playing song if it's already in the queue
          if (currentSongIdx >= 0) {
            queueCopy.splice(currentSongIdx, 1);
          }
          queueCopy.splice(nextSongIdx, 1);
          client.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: queueCopy },
          });
          localStorage.setItem("queue", JSON.stringify(queueCopy));
        }
      }
    }
  }, [data.queue, played, song.id, songDispatch]);

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


  const handlePlayPrevious = () => {
    const currentSongIdx = data.queue.findIndex((s) => s.id === song.id);
    const previousSong = data.queue[currentSongIdx - 1];
    const LastSong = data.queue[data.queue.length - 1];
    songDispatch({
      type: "PLAY_SONG",
      song: previousSong ? previousSong : LastSong,
    });
  };

  const handlePlayNext = () => {
    const currentSongIdx = data.queue.findIndex((s) => s.id === song.id);
    const nextSong = data.queue[currentSongIdx + 1];
    const FirstSong = data.queue[0];
    songDispatch({ type: "PLAY_SONG", song: nextSong ? nextSong : FirstSong });
  };

  return (
    <>
      <Card className={greaterThanMedium ? classes.card : `${classes.card} ${classes.cardBiggerThanMd}`}>
        <Box className={greaterThan420PX ? classes.cardWrapper : `${classes.cardWrapper} ${classes.cardWrapperAlignCenter}`}>

          <CardContent className={greaterThan420PX ? classes.cardContent : classes.cardContentLessThan420}>
            <Box className={greaterThan420PX ? "" : classes.playerHeader}>
              <Typography component='div' variant='h5'>{title}</Typography>
              <Typography variant='subtitle1' color='text.secondary' component='div'>{artist}</Typography>
            </Box>
            {!greaterThan420PX && <CardMedia component='img' sx={{ width: 151 }} image={thumbnail} alt={`${title} song thumbnail`} />}
          </CardContent>

          <Box className={classes.btnWrapper}>
            <IconButton aria-label='previous' sx={btnHover} onClick={handlePlayPrevious}>
              <SkipPrevious />
            </IconButton>
            <IconButton aria-label='play/pause' sx={btnHover} onClick={hanndleTogglePlay}>
              {isPlaying ? (<Pause className={classes.playBtn} />) : (<PlayArrow className={classes.playBtn} />)}
            </IconButton>
            <IconButton aria-label='next' sx={btnHover} onClick={handlePlayNext}>
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

        </Box>

        {greaterThan420PX && <CardMedia component='img' sx={{ width: 151 }} image={thumbnail} alt={`${title} song thumbnail`} />}
      </Card>
      <MediaPlayerPortal url={url} isPlaying={isPlaying} setPlayed={setPlayed} setPlayedSeconds={setPlayedSeconds} seeking={seeking} ref={YtPlayerRef} />
    </>
  );
}
