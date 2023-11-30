import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useGameContext } from 'components/Game/context/GameProvider';

export enum CellStatus {
  default = 'default',
  pending = 'pending',
  win = 'win',
  lose = 'lose',
}

interface StyledCellProps extends ButtonProps {
  status: CellStatus;
}

const StyledCell = styled(Button, {
  shouldForwardProp: (propName) => propName !== 'status',
})<StyledCellProps>(({ theme, status }) => ({
  width: 70,
  height: 70,
  backgroundColor: theme.palette.secondary.main,
  transition: 'opacity 200ms linear',
  '&:hover': {
    ...(status === CellStatus.pending && {
      backgroundColor: theme.palette.warning.main,
    }),
    opacity: 0.7,
  },
  ...(status === CellStatus.pending && {
    backgroundColor: theme.palette.warning.main,
  }),
  ...(status === CellStatus.win && {
    backgroundColor: theme.palette.primary.main,
  }),
  ...(status === CellStatus.lose && {
    backgroundColor: theme.palette.error.main,
  }),
}));

interface CellProps {
  col: number;
  row: number;
}

const Cell: FC<CellProps> = ({ col, row }) => {
  const roundTimeoutId = useRef<ReturnType<typeof setTimeout>>();
  const { gameIsRunning, score, roundDuration, cellsParams, setScore } =
    useGameContext();
  const stringPositions = JSON.stringify(
    cellsParams.filter((cell) => cell.initialised),
  );
  const initialised = stringPositions.includes(`{"col":${col},"row":${row}`);
  const [status, setStatus] = useState(CellStatus.default);

  useEffect(() => {
    if (initialised && score.player < 10 && score.skyNet < 9) {
      setStatus(CellStatus.pending);
    }
  }, [initialised]);

  useEffect(() => {
    clearTimeout(roundTimeoutId.current);
    if (status === CellStatus.pending) {
      roundTimeoutId.current = setTimeout(() => {
        setScore((prevState) => ({
          ...prevState,
          skyNet:
            prevState.skyNet < 10 ? prevState.skyNet + 1 : prevState.skyNet,
        }));
        setStatus(CellStatus.lose);
      }, Number(roundDuration));
    }
  }, [status]);

  const clickHandler = () => {
    setStatus(CellStatus.win);
    setScore({
      ...score,
      player: score.player < 10 ? score.player + 1 : score.player,
    });
    clearTimeout(roundTimeoutId.current);
  };

  useEffect(() => {
    if (gameIsRunning) {
      setStatus(CellStatus.default);
    }
  }, [gameIsRunning]);

  return (
    <StyledCell
      status={status}
      onClick={clickHandler}
      disabled={status !== CellStatus.pending}
    />
  );
};

export default Cell;
