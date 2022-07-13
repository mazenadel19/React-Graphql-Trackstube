import { createContext, useReducer } from "react";

import SongsReducer from "./reducers/songs/SongsReducer";

export const SongContext = createContext({});

const initialState = {
  song: '',
  isPlaying: false,
};

const SongsProvider = ({ children }) => {
  const [songState, songDispatch] = useReducer(SongsReducer, initialState);

  const values = {
    songState,
    songDispatch,
  };

  return <SongContext.Provider value={values}>{children}</SongContext.Provider>;
};

export default SongsProvider;
