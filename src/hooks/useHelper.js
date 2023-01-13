import { useMediaQuery } from "@mui/material";


const useHelper = () => {
  const greaterThanMedium = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const greaterThanSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThan420PX = useMediaQuery("(min-width:420px)");
  const initialSongState = {
    thumbnail: "",
    duration: 0,
    title: "",
    artist: "",
    url: "",
  };

  const formatDuration = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  };

  return { initialSongState, greaterThanMedium, greaterThanSmall, greaterThan420PX, formatDuration };
}

export default useHelper