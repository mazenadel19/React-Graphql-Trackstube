import { useEffect, useContext, useState } from 'react';

// Apollo
import client from '../../graphql/client';
import { GET_QUEUED_SONGS } from '../../graphql/queries';

// Context
import { SongContext } from '../../context/SongsProvider';

const useSongPlayer = (data) => {
    const [played, setPlayed] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const { songState: { song }, songDispatch } = useContext(SongContext);

    useEffect(() => {
        if (data?.queue) {
            const currentSongIdx = data.queue.findIndex((s) => s.id === song.id);
            const nextSong = data.queue[currentSongIdx + 1];

            if (nextSong && played >= 0.99) {
                songDispatch({ type: "PLAY_SONG", song: nextSong });
            } else if (data.queue.length && played >= 0.99) {
                songDispatch({ type: "PLAY_SONG", song: data.queue[0] });
            } else if (!nextSong && played >= 0.99) {
                songDispatch({ type: "TOGGLE_SONG" });
            }

            if (played >= 0.99) {
                setPlayed(0);
                setPlayedSeconds(0);

                const queryResult = client.readQuery({ query: GET_QUEUED_SONGS });

                if (queryResult) {
                    const { queue } = queryResult;
                    if (queue.length) {
                        const nextSongIdx = currentSongIdx + 1;
                        const queueCopy = [...queue]; // queue is immutable
                        // removes playing song if it's already in the queue
                        if (currentSongIdx >= 0) {
                            queueCopy.splice(currentSongIdx, 1);
                        }
                        queueCopy.splice(nextSongIdx, 1);
                        client.writeQuery({
                            query: GET_QUEUED_SONGS,
                            data: { queue: queueCopy },
                        });
                        localStorage.setItem("queue", JSON.stringify(queueCopy));
                    }
                }
            }
        }
    }, [data?.queue, played, song.id, songDispatch]);


    return { played, setPlayed, playedSeconds, setPlayedSeconds }
}

export default useSongPlayer