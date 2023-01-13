import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import YtPlayer from "../AddSong/YtPlayer";

const MediaPlayerPortal = forwardRef((props, ref) => {
  const { url, isPlaying, setPlayed, setPlayedSeconds, seeking } = props;
  return ReactDOM.createPortal(
    <YtPlayer
      ref={ref}
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
  );
})

export default MediaPlayerPortal;
