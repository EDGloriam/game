import { useCallback, useEffect, useRef, useState } from 'react';

import { SCORE_LIMIT } from 'constants/Game';
import { getInitialPositions } from 'helpers/getInitialPositions';
import { delay } from 'helpers/delay';
import { selectorsGame } from 'app/game/selectors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { GameStatuses, resetGame, updateGameStatus } from 'app/game/gameSlice';
import { resetBoard, updateCellsStatuses } from 'app/game/boardSlice';

export const useGame = () => {
  const score = useAppSelector(selectorsGame.score);
  const gameStatus = useAppSelector(selectorsGame.gameStatus);
  const roundDuration = useAppSelector(selectorsGame.roundDuration);
  const dispatch = useAppDispatch();
  const gameIsRunningRef = useRef(true);
  const [cellsForGame, setCellsForGame] = useState<number[]>(
    getInitialPositions(),
  );

  const resetHandler = useCallback(() => {
    dispatch(updateGameStatus(GameStatuses.pending));
    gameIsRunningRef.current = false;
  }, []);

  const stopGameHandler = useCallback(() => {
    dispatch(updateGameStatus(GameStatuses.stopped));
  }, []);

  const startHandler = useCallback(() => {
    gameIsRunningRef.current = true;
    dispatch(updateGameStatus(GameStatuses.running));
  }, []);

  const roundHandler = () => {
    const currentCellIndex = cellsForGame.shift();
    dispatch(updateCellsStatuses(currentCellIndex));
  };

  useEffect(() => {
    if (score.player === SCORE_LIMIT || score.skyNet === SCORE_LIMIT) {
      gameIsRunningRef.current = false;
      stopGameHandler();
    }
  }, [score]);

  useEffect(() => {
    const gameLoop = async () => {
      while (gameIsRunningRef.current && gameStatus === GameStatuses.running) {
        // eslint-disable-next-line no-await-in-loop
        await delay(roundDuration);
        roundHandler();
      }
    };

    if (gameStatus === GameStatuses.pending) {
      dispatch(resetGame());
      dispatch(resetBoard());
      setCellsForGame(getInitialPositions());
    } else {
      gameLoop();
    }
  }, [gameStatus]);

  return {
    startHandler,
    resetHandler,
    stopGameHandler,
  };
};
