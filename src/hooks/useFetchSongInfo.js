import { useState } from 'react'
// hook
import useHelper from './useHelper';


const useFetchSongInfo = (url) => {
    const {initialSongState} = useHelper()
    const [song, setSong] = useState(initialSongState);

    const handleFetchSongData = ({ player }) => {
        const nestedPlayer = player.player.player;
        const { video_id, title, author } = nestedPlayer.getVideoData();
        const duration = nestedPlayer.getDuration();
        const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
        setSong({ thumbnail, duration, title, artist: author, url });
    };
    return ({ song, setSong, handleFetchSongData})
}

export default useFetchSongInfo