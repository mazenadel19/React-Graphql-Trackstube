import { useSubscription } from "@apollo/client";
import { GET_SONGS_SUBSCRIPTION } from "../../graphql/subscriptions";
import Song from "./Song";
import Spinner from "./Spinner";

const SongList = () => {
  const { loading, error, data } = useSubscription(GET_SONGS_SUBSCRIPTION)
  if (loading) {
    return <Spinner />;
  }

  if (error) return <p>{error.message}</p>

  return (
    <>
      {data.songs.map(( song ) => (
         <Song key={song.id} song={song} />
      ))}
    </>
  );
};

export default SongList;
