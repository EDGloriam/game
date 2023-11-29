import React, { useState } from 'react';
import { Typography, Collapse, IconButton } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import { GameProvider } from 'components/Game/context/GameProvider';
import Game from 'components/Game';

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Typography variant="h2">
        Mini-game
        <IconButton onClick={handleToggle}>
          <HelpOutlineRoundedIcon />
        </IconButton>
      </Typography>
      <Collapse in={open}>
        <Typography>
          In this engaging mini-game, you find yourself facing a 10x10 grid of
          captivating blue squares. A mysterious <strong>Start</strong> button
          beckons you to embark on a challenge. <br />
          <br />
          As you press it, a single square is chosen at random, adorned in a
          fleeting yellow glow. Your mission? Swiftly click on this illuminated
          square within the timeframe of N milliseconds. Success transforms the
          square into a triumphant shade of green, and you gain a well-deserved
          point. However, should the milliseconds slip away, the square turns a
          somber red, and a point slides into the computer&apos;s score. <br />
          <br />
          The race against time and wits ensues until either you or the computer
          amass <strong>10 points</strong>, heralding the end of this riveting
          game. In the end window emerges, sharing the tale of victory or
          defeat, urging you to relive the challenge or bask in the sweet taste
          of triumph. The saga unfolds with each click, and only the quickest
          will emerge victorious in this vibrant grid of chance.
        </Typography>
      </Collapse>
      <GameProvider>
        <Game />
      </GameProvider>
    </>
  );
};

export default Home;
