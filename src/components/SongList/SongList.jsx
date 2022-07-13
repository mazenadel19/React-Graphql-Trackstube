import { useContext, useEffect, useRef } from "react";
import { useSubscription } from "@apollo/client";

import { SongContext } from "../../context/SongsProvider";
import { GET_SONGS_SUBSCRIPTION } from "../../graphql/subscriptions";

import Song from "./Song";
import Spinner from "./Spinner";

const SongList = () => {
  const { loading, error, data } = useSubscription(GET_SONGS_SUBSCRIPTION);
  const { songDispatch } = useContext(SongContext);
  const first = useRef(true);

  useEffect(() => {
    if (first.current && !error && !loading && data?.songs?.length) {
      first.current = false;
      songDispatch({ type: "INITIAL_RENDER", song: data.songs[0] });
    }
  }, [data, error, loading, songDispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </>
  );
};

export default SongList;
