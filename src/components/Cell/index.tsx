import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SCORE_LIMIT } from 'constants/Game';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectorsGame } from 'app/game/selectors';
import { GameStatuses, pointToPlayer, pointToSkyNet } from 'app/game/gameSlice';
import { CellStatus } from 'app/game/boardSlice';

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
  const score = useAppSelector(selectorsGame.score);
  const gameStatus = useAppSelector(selectorsGame.gameStatus);
  const roundDuration = useAppSelector(selectorsGame.roundDuration);
  const dispatch = useAppDispatch();
  const [localStatus, setLocalStatus] = useState(status);
  const roundTimeoutId = useRef<ReturnType<typeof setTimeout>>();

  const clickHandler = () => {
    setLocalStatus(CellStatus.win);
    dispatch(pointToPlayer());
    clearTimeout(roundTimeoutId.current);
  };

  useEffect(() => {
    if (
      score.skyNet < SCORE_LIMIT - 1 &&
      score.player < SCORE_LIMIT &&
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
        dispatch(pointToSkyNet());
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
