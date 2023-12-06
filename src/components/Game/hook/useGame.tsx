import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SCORE_LIMIT } from 'constants/Game';
import { getInitialPositions } from 'helpers/getInitialPositions';
import { delay } from 'helpers/delay';
import { CellStatus } from 'components/Cell';
import { GameStatuses, Score } from 'components/Game/context/GameProvider';

export const initialScore = {
  player: 0,
  skyNet: 0,
};

export const initialCells = Array(100).fill(CellStatus.default);

interface UseGame {
  score: Score;
  setScore: Dispatch<SetStateAction<Score>>;
  setAllCellsStatuses: Dispatch<SetStateAction<CellStatus[]>>;
  roundDuration: number | undefined;
  gameStatus: GameStatuses;
  setGameStatus: Dispatch<SetStateAction<GameStatuses>>;
}

export const useGame = ({
  roundDuration,
  score,
  setScore,
  setAllCellsStatuses,
  setGameStatus,
  gameStatus,
}: UseGame) => {
  const gameIsRunningRef = useRef(true);
  const [cellsForGame, setCellsForGame] = useState<number[]>(
    getInitialPositions(),
  );

  const resetHandler = useCallback(() => {
    setGameStatus(GameStatuses.pending);
    gameIsRunningRef.current = false;
  }, []);

  const stopGameHandler = useCallback(() => {
    setGameStatus(GameStatuses.stopped);
  }, []);

  const startHandler = useCallback(() => {
    gameIsRunningRef.current = true;
    setGameStatus(GameStatuses.running);
  }, []);

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
      setScore(initialScore);
      setAllCellsStatuses(initialCells);
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
