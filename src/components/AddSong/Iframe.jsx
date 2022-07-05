import YouTubePlayer from "react-player/youtube";


function Iframe({ url, handleEditSong }) {
  return (
    <div className="Iframe_Wrapper">
      <YouTubePlayer
        url={
          url.includes("/watch?v=") ? url.replace("/watch?v=", "/embed/") : url
        }
        onReady={handleEditSong}
        config={{
          youtube: { playerVars: { origin: "https://www.youtube.com" } },
        }}
      />
    </div>
  );
}

export default Iframe;
