import  { useContext, useEffect, useRef } from 'react'
import { SongContext } from '../context/SongsProvider';
// Apollo
import client from '../graphql/client';
import { GET_QUEUED_SONGS } from '../graphql/queries';

const useSongList = ({ error, loading, data }) => {
    const { songDispatch } = useContext(SongContext);
    const first = useRef(true);

    useEffect(() => {
        if (first.current && !error && !loading && data?.songs?.length) {
            first.current = false;
            const queryResult = client.readQuery({ query: GET_QUEUED_SONGS });
            const { queue } = queryResult;
            songDispatch({
                type: "INITIAL_RENDER",
                song: queue.length ? queue[0] : data.songs[0],
            });
        }
    }, [data, error, loading, songDispatch]);

  return null
}

export default useSongList