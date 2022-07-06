import { Grid, Hidden, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AddSong from "./components/AddSong/AddSong";
import Header from "./components/Header/Header";
import QueuedSongList from "./components/QueuedSongList/QueuedSongList";
import SongList from "./components/SongList/SongList";
import SongPlayer from "./components/SongPlayer/SongPlayer";

const styles = {
  containerDesktop: {
    px: 2,
    pt: 11,
  },
  containerMobile: {
    pt: 2,
  },
  rightSection: {
    common: {
      position: "fixed",
      width: "100%",
    },
    mobile: {
      left: 0,
      bottom: 0,
      transition: "left 5s ease",
      paddingLeft: '0 !important',
    },
    desktop: {
      right: 0,
      top: 60,
    },
  },
};

function App() {
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const greaterThanSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));

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
      <div id="iframe-root"></div>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid
        container
        spacing={3}
        sx={greaterThanSmall ? styles.containerDesktop : styles.containerMobile}
      >
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={
            greaterThanMedium
              ? {
                  ...styles.rightSection.common,
                  ...styles.rightSection.desktop,
                }
              : {
                  ...styles.rightSection.common,
                  ...styles.rightSection.mobile,
                  left: scrolling ? "90%" : "0",
                }
          }
        >
          <SongPlayer />
          {greaterThanMedium && <QueuedSongList />}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
