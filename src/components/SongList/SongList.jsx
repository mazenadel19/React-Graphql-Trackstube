// Apollo
import { useSubscription } from "@apollo/client";
import { GET_SONGS_SUBSCRIPTION } from "../../graphql/subscriptions";
// Components
import Song from "./Song";
import Spinner from "./Spinner";
// MUI
import { Typography } from "@mui/material";
// Hook
import useSongList from "../../hooks/useSongList";

const SongList = () => {
  const { loading, error, data } = useSubscription(GET_SONGS_SUBSCRIPTION);
  useSongList({ loading, error, data })

  if (loading) {
    return <Spinner />;
  }

  if (error) return <Typography>{error.message}</Typography>;

  return (
    <>
      {data?.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </>
  );
};

export default SongList;
