import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGameContext } from '../Game/context/GameProvider';

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
  const { score, roundDuration, cellsPositions, setScore } = useGameContext();
  const stringPositions = JSON.stringify(
    cellsPositions.filter((cell) => cell.initialised),
  );
  const initialised = stringPositions.includes(`{"col":${col},"row":${row}`);
  const [status, setStatus] = useState(CellStatus.default);

  useEffect(() => {
    if (initialised) {
      setStatus(CellStatus.pending);
      roundTimeoutId.current = setTimeout(() => {
        setScore({
          ...score,
          skyNet: score.skyNet + 1,
        });
        setStatus(CellStatus.lose);
      }, Number(roundDuration));
    }

    return () => clearTimeout(roundTimeoutId.current);
  }, [initialised]);

  const clickHandler = () => {
    setStatus(CellStatus.win);
    setScore({
      ...score,
      player: score.player + 1,
    });
    clearTimeout(roundTimeoutId.current);
  };

  return (
    <StyledCell
      status={status}
      onClick={clickHandler}
      disabled={status !== CellStatus.pending}
    />
  );
};

export default Cell;
