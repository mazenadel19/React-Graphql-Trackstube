import { useQuery } from "@apollo/client";
import { GET_SONGS } from "../../graphql/queries";
import Song from "./Song";
import Spinner from "./Spinner";

const SongList = () => {
  const { loading, error, data } = useQuery(GET_SONGS)
  
  if (loading) {
    return <Spinner />;
  }

  if (error) return <p>{error.message}</p>


  return (
    <>
      {data.songs.map(({ title, artist, thumbnail, id }) => (
        <Song key={id} title={title} artist={artist} thumbnail={thumbnail} />
      ))}
    </>
  );
};

export default SongList;
