import React, {ChangeEvent, useRef, useState} from 'react';
import {
  Typography,
  Collapse,
  IconButton,
  TextField,
  Button,
  Box,
} from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import Cell from 'components/Cell';
import { styled } from '@mui/material/styles';

export enum CellStatus {
  default = 'default',
  pending = 'pending',
  win = 'win',
  lose = 'lose',
}

const MainWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px auto',
  maxWidth: 718,
}));

const Board = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 2,
  marginTop: 10,
}));

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

const Controls = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: 20,
  width: '100%',
}));

const initialScore = {
  player: 0,
  skyNet: 0,
};

const Game = () => {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(initialScore);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [roundDuration, setRoundDuration] = useState<string>('');
  const timerId = useRef<ReturnType<typeof setTimeout>>();

  const handleToggle = () => {
    setOpen(!open);
  };

  const startHandler = () => {
    // TODO add validation. ms can't be empty
    setGameIsRunning(true);
  };

  const resetHandler = () => {
    setGameIsRunning(false);
    setScore(initialScore);
  };

  const roundDurationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO add validation. Should be number
    setRoundDuration(event.target.value);
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
      <MainWrapper>
        <Controls>
          <TextField
            label="Time (ms)"
            value={roundDuration}
            onChange={roundDurationChangeHandler}
            placeholder="Enter time"
            type="text"
            variant="standard"
          />

          <Typography variant="h3">
            Score: {score.player} / {score.skyNet}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {gameIsRunning ? (
              <Button variant="contained" onClick={resetHandler}>
                Reset
              </Button>
            ) : (
              <Button variant="contained" onClick={startHandler}>
                Start
              </Button>
            )}
          </Box>
        </Controls>
        <Board>
          {Array(10)
            .fill(CellStatus.default)
            .map(() => (
              <Row>{Array(10).fill(CellStatus.default).map(Cell)}</Row>
            ))}
        </Board>
      </MainWrapper>
    </>
  );
};

export default Game;
