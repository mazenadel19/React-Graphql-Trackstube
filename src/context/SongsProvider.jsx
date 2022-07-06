import { createContext, useReducer } from "react";

import SongsReducer from "./reducers/songs/SongsReducer";

export const SongContext = createContext({});

const initialState = {
  song: {
    artist: "Eminem ",
    duration: 406,
    id: "04757635-edc0-46d8-bf2d-ec0e83be6815",
    thumbnail:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-MO9k-iWFMk8%2FT4ZnSJNL0wI%2FAAAAAAAABJc%2FiRETdRsCEt4%2Fs1600%2FEminem-Stan_(Featuring_Dido).jpg&f=1&nofb=1",
    title: "Stan FT. Dido",
    url: "https://www.youtube.com/watch?v=IzOF6_7nKAk",
  },
  isPlaying: false,
};

const SongsProvider = ({ children }) => {
  const [songsState, songsDispatch] = useReducer(SongsReducer, initialState);

  const values = {
    songsState,
    songsDispatch,
  };
  return <SongContext.Provider value={values}>{children}</SongContext.Provider>;
};

export default SongsProvider;
