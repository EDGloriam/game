import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { CellStatus } from 'components/Cell';
import { getInitialPositions } from 'helpers/getInitialPositions';
import { delay } from 'helpers/delay';
import { SCORE_LIMIT } from 'constants/Game';

interface GameProviderProps {
  children?: ReactNode;
}

export type Score = {
  player: number;
  skyNet: number;
};

export enum GameStatuses {
  pending = 'pending',
  running = 'running',
  stopped = 'stopped',
}

interface GameContextType {
  score: Score;
  setScore: Dispatch<SetStateAction<Score>>;
  allCellsStatuses: CellStatus[];
  setAllCellsStatuses: Dispatch<SetStateAction<CellStatus[]>>;
  currentCellIndex?: number;
  roundDuration: number | undefined;
  setRoundDuration: Dispatch<SetStateAction<number | undefined>>;
  startHandler: () => void;
  stopGameHandler: () => void;
  resetHandler: () => void;
  gameStatus: GameStatuses;
}

export const GameContext = createContext({} as GameContextType);

export const useGameContext = () => useContext(GameContext);

const initialScore = {
  player: 0,
  skyNet: 0,
};

const initialCells = Array(100).fill(CellStatus.default);

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
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

  const resetHandler = useCallback(() => {
    setGameStatus(GameStatuses.pending);
    gameIsRunningRef.current = false;
  }, []);

  useEffect(() => {
    if (gameStatus === GameStatuses.pending) {
      setScore(initialScore);
      setAllCellsStatuses(initialCells);
      setCellsForGame(getInitialPositions());
    }
  }, [gameStatus]);

  const stopGameHandler = useCallback(() => {
    setGameStatus(GameStatuses.stopped);
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

  const startHandler = useCallback(() => {
    gameIsRunningRef.current = true;
    setGameStatus(GameStatuses.running);
  }, []);

  useEffect(() => {
    if (score.player === SCORE_LIMIT || score.skyNet === SCORE_LIMIT) {
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

  const contextValue = useMemo(
    () => ({
      roundDuration,
      setRoundDuration,
      startHandler,
      resetHandler,
      gameStatus,
      stopGameHandler,
      allCellsStatuses,
      setAllCellsStatuses,
      score,
      setScore,
    }),
    [
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
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
