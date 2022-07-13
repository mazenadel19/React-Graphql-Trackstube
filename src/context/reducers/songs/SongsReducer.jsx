const SongsReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SONG":
      return { ...state, isPlaying: !state.isPlaying };

    case "PLAY_SONG":
      return { ...state, song: action.song, isPlaying: true };

    case "PAUSE_SONG":
      return { ...state, song: action.song, isPlaying: false };

    case "SAVE_TO_QUEUE":
      return { ...state, queue: [...state.queue, action.song] };

    case "REMOVE_FROM_QUEUE": {
      const newQueue = state.queue.filter((song) => song.id !== action.id);
      return { ...state, queue: newQueue };
    }

    case "INITIAL_RENDER":{
      return { ...state, song: action.song };
    }

    default:
      return state;
  }
};

export default SongsReducer;
