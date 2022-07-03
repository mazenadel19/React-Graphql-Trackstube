import Song from "./Song";
import Spinner from "./Spinner";

const dummySong = {
  title: "title",
  artist: "artist",
  thumbnail: "https://bit.ly/3a6SEZT",
};

const songsArray = Array.from({ length: 10 }, () => dummySong);

const SongList = () => {
  let loading = false;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {songsArray.map(({ title, artist, thumbnail }, index) => (
        <Song key={index} title={title} artist={artist} thumbnail={thumbnail}/>
      ))}
    </>
  );
};

export default SongList;
