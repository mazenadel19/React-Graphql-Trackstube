import { forwardRef } from "react";
import YouTubePlayer from "react-player/youtube";

const YtPlayer = forwardRef(
  ({ url, handleEditSong, playing, onProgress }, ref) => {
    return (
      <div className="YtPlayer_Wrapper">
        <YouTubePlayer
          ref={ref}
          onProgress={onProgress}
          playing={playing}
          url={
            url.includes("/watch?v=")
              ? url.replace("/watch?v=", "/embed/")
              : url
          }
          onReady={handleEditSong}
          config={{
            youtube: { playerVars: { origin: "https://www.youtube.com" } },
          }}
        />
      </div>
    );
  }
);
export default YtPlayer;
