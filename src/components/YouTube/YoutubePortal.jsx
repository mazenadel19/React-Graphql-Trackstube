import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import YtPlayer from "./YtPlayer";

const YoutubePortal = forwardRef((props, ref) => {
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

export default YoutubePortal;
