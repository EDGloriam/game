import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  GameStatuses,
  useGameContext,
} from 'components/Game/context/GameProvider';

export enum CellStatus {
  default = 'default',
  pending = 'pending',
  win = 'win',
  lose = 'lose',
}

interface CellProps {
  status: CellStatus;
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

const Cell: FC<CellProps> = ({ status }) => {
  const [localStatus, setLocalStatus] = useState(status);
  const roundTimeoutId = useRef<ReturnType<typeof setTimeout>>();
  const { gameStatus, score, setScore, roundDuration } = useGameContext();

  const clickHandler = () => {
    setLocalStatus(CellStatus.win);
    setScore((prevState) => {
      if (prevState.player < 10) {
        return {
          ...prevState,
          player: prevState.player + 1,
        };
      }
      return prevState;
    });
    clearTimeout(roundTimeoutId.current);
  };

  useEffect(() => {
    if (
      score.skyNet < 9 &&
      score.player < 10 &&
      gameStatus === GameStatuses.running
    ) {
      setLocalStatus(status);
    }
  }, [status]);

  useEffect(() => {
    if (gameStatus === GameStatuses.pending) {
      clearInterval(roundTimeoutId.current);
      setLocalStatus(CellStatus.default);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (localStatus === CellStatus.pending) {
      roundTimeoutId.current = setTimeout(() => {
        setScore((prevState) => {
          if (prevState.skyNet < 10) {
            return {
              ...prevState,
              skyNet: prevState.skyNet + 1,
            };
          }
          return prevState;
        });
        setLocalStatus(CellStatus.lose);
      }, roundDuration);
    }
  }, [localStatus]);

  return (
    <StyledCell
      data-testid="cell"
      status={localStatus}
      onClick={clickHandler}
      disabled={localStatus !== CellStatus.pending}
    />
  );
};

export default Cell;
