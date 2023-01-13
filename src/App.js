import { useEffect, useRef, useState } from "react";
// Components
import AddSong from "./components/AddSong/AddSong";
import Header from "./components/Header/Header";
import QueuedSongList from "./components/QueuedSongList/QueuedSongList";
import SongList from "./components/SongList/SongList";
import SongPlayer from "./components/SongPlayer/SongPlayer";
// Helper
import useHelper from "./components/hooks/useHelper";
// MUI
import { Grid, Hidden } from "@mui/material";
// Styles
import classes from "./App.module.css";

function App() {
  const { greaterThanMedium, greaterThanSmall } = useHelper();
  const [scrolling, setScrolling] = useState(false);
  let first = useRef(true);

  useEffect(() => {
    if (first.current) {
      window.addEventListener("scroll", () => {
        setScrolling(true);
      });
      first.current = false;
    }
  }, []);

  useEffect(() => {
    if (scrolling) {
      setTimeout(() => {
        setScrolling(false);
      }, 5000);
    }
  });

  return (
    <div>
      <div id='ytPlayer-root'></div>
      <Hidden only='xs'>
        <Header />
      </Hidden>
      <Grid
        container
        spacing={3}
        className={`${
          greaterThanSmall ? classes.containerDesktop : classes.containerMobile
        }`}
      >
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          className={`${classes.rightSectionCommon}
          ${
            greaterThanMedium
              ? classes.rightSectionDesktop
              : classes.rightSectionMobile
          }
          ${
            greaterThanMedium
              ? ""
              : scrolling
              ? classes.bottomMinus50
              : classes.bottomZero
          }
          `}
        >
          <SongPlayer />
          {greaterThanMedium && <QueuedSongList />}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
