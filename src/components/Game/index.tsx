import React, { useId } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Cell, { CellStatus } from 'components/Cell';
import { useGameContext } from './context/GameProvider';

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

const Game = () => {
  const {
    startHandler,
    resetHandler,
    score,
    roundDuration,
    roundDurationChangeHandler,
    gameIsRunning,
  } = useGameContext();

  return (
    <MainWrapper>
      <Controls>
        {/* TODO block when game is running */}
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
              Stop & Reset
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
          .map((_, row) => {
            const rowKey = useId();

            return (
              <Row key={rowKey}>
                {Array(10)
                  .fill(CellStatus.default)
                  .map((__, col) => {
                    const key = useId();
                    return <Cell key={key} col={col} row={row} />;
                  })}
              </Row>
            );
          })}
      </Board>
    </MainWrapper>
  );
};

export default Game;
