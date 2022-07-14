import ReactDOM from "react-dom";
import { useContext, useRef, useState, useEffect } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import { Pause, PlayArrow, SkipPrevious, SkipNext } from "@mui/icons-material";
import { Slider, useMediaQuery } from "@mui/material";

import { btnHover } from "../SongList/Song";
import { SongContext } from "../../context/SongsProvider";
import YtPlayer from "../AddSong/YtPlayer";
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from "../../graphql/queries";
import client from "../../graphql/client";

const styles = {
  card: { display: "flex", justifyContent: "space-around", m: 1, boxShadow: 3 },
  cardWrapper: { display: "flex", flexDirection: "column" },
  cardContent: { flex: "1 0 auto" },
  btnWrapper: { display: "flex", alignItems: "center", pl: 1, pb: 1 },
  playBtn: { height: 38, width: 38 },
  btnHover: btnHover[0],
  cardContentLessThan420: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gridColumnGap: "5px",
  },
  playerHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default function SongPlayer() {
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const greaterThan420PX = useMediaQuery("(min-width:420px)");

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

    if (nextSong && played === 1) {
      songDispatch({ type: "PLAY_SONG", song: nextSong });
    } else if (data.queue.length && played === 1) {
      songDispatch({ type: "PLAY_SONG", song: data.queue[0] });
    } else if (!nextSong && played === 1) {
      songDispatch({ type: "TOGGLE_SONG" });
    } 
    if (played === 1) {
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

  if (!song) return;

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

  const formatDuration = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  };

  return (
    <>
      <Card
        sx={
          greaterThanMedium
            ? styles.card
            : { ...styles.card, mx: 0, mb: "15px" }
        }
      >
        <Box
          sx={
            greaterThan420PX
              ? styles.cardWrapper
              : { ...styles.cardWrapper, alignItems: "center" }
          }
        >
          <CardContent
            sx={
              greaterThan420PX
                ? styles.cardContent
                : styles.cardContentLessThan420
            }
          >
            <div style={greaterThan420PX ? {} : styles.playerHeader}>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {artist}
              </Typography>
            </div>
            {!greaterThan420PX && (
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={thumbnail}
                alt={`${title} song thumbnail`}
              />
            )}
          </CardContent>

          <Box sx={styles.btnWrapper}>
            <IconButton aria-label="previous" sx={styles.btnHover}>
              <SkipPrevious />
            </IconButton>
            <IconButton
              aria-label="play/pause"
              sx={styles.btnHover}
              onClick={hanndleTogglePlay}
            >
              {isPlaying ? (
                <Pause sx={styles.playBtn} />
              ) : (
                <PlayArrow sx={styles.playBtn} />
              )}
            </IconButton>
            <IconButton aria-label="next" sx={styles.btnHover}>
              <SkipNext />
            </IconButton>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="p"
            >
              {formatDuration(playedSeconds)}
            </Typography>
          </Box>
          <Slider
            onMouseDown={handleSeekingMouseDown}
            onMouseUp={handleSeekingMouseUp}
            onChange={handleProgressChange}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.01}
            size="small"
          />
        </Box>

        {greaterThan420PX && (
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={thumbnail}
            alt={`${title} song thumbnail`}
          />
        )}
      </Card>
      {ReactDOM.createPortal(
        <YtPlayer
          ref={YtPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          playing={isPlaying}
          url={url}
        />,
        document.getElementById("ytPlayer-root")
      )}
    </>
  );
}
