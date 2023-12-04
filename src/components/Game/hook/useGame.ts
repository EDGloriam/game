import { useEffect, useRef, useState } from 'react';

import { CellStatus } from 'components/Cell';
import { getInitialPositions } from 'helpers/getInitialPositions';
import { delay } from 'helpers/delay';
import { GameStatuses, Score } from 'components/Game/context/GameProvider';

const initialScore = {
  player: 0,
  skyNet: 0,
};

const initialCells = Array(100).fill(CellStatus.default);

export const useGame = () => {
  const [score, setScore] = useState<Score>(initialScore);
  const [allCellsStatuses, setAllCellsStatuses] =
    useState<CellStatus[]>(initialCells);
  const [cellsForGame, setCellsForGame] = useState<number[]>(
    getInitialPositions(),
  );
  const [gameStatus, setGameStatus] = useState<GameStatuses>(
    GameStatuses.pending,
  );
  const gameIsRunningRef = useRef(true);

  const [roundDuration, setRoundDuration] = useState<number | undefined>();

  const resetHandler = () => {
    setGameStatus(GameStatuses.pending);
    gameIsRunningRef.current = false;
  };

  useEffect(() => {
    if (gameStatus === GameStatuses.pending) {
      setScore(initialScore);
      setAllCellsStatuses(initialCells);
      setCellsForGame(getInitialPositions());
    }
  }, [gameStatus]);

  const stopGameHandler = () => {
    setGameStatus(GameStatuses.stopped);
  };

  const roundHandler = () => {
    const currentCellIndex = cellsForGame.shift();
    setAllCellsStatuses((prevState) =>
      prevState.map((cell, index) => {
        if (index === currentCellIndex) {
          return CellStatus.pending;
        }

        return cell;
      }),
    );
  };

  const startHandler = () => {
    gameIsRunningRef.current = true;
    setGameStatus(GameStatuses.running);
  };

  useEffect(() => {
    if (score.player === 10 || score.skyNet === 10) {
      gameIsRunningRef.current = false;
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
    gameLoop();
  }, [gameStatus]);

  return {
    allCellsStatuses,
    setAllCellsStatuses,
    roundDuration,
    setRoundDuration,
    startHandler,
    resetHandler,
    gameStatus,
    stopGameHandler,
    score,
    setScore,
  };
};
