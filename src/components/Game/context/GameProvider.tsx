import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getInitialPositions } from 'helpers/getInitialPositions';
import { CellStatus } from 'components/Cell';

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
  roundDuration: string;
  setRoundDuration: Dispatch<SetStateAction<string>>;
  startHandler: () => void;
  stopGameHandler: () => void;
  resetHandler: () => void;
  gameIsRunning: GameStatuses;
}

export const GameContext = createContext({} as GameContextType);

export const useGameContext = () => useContext(GameContext);

const initialScore = {
  player: 0,
  skyNet: 0,
};

const initialCells = Array(100).fill(CellStatus.default);

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [score, setScore] = useState<Score>(initialScore);
  const [allCellsStatuses, setAllCellsStatuses] =
    useState<CellStatus[]>(initialCells);
  const [cellsForGame, setCellsForGame] = useState<number[]>(
    getInitialPositions(),
  );
  const [gameIsRunning, setGameIsRunning] = useState<GameStatuses>(
    GameStatuses.pending,
  );
  const gameIsRunningRef = useRef(true);

  const [roundDuration, setRoundDuration] = useState<string>('');

  const resetHandler = () => {
    setGameIsRunning(GameStatuses.pending);
    gameIsRunningRef.current = false;
  };

  useEffect(() => {
    if (gameIsRunning === GameStatuses.pending) {
      setScore(initialScore);
      setAllCellsStatuses(initialCells);
      setCellsForGame(getInitialPositions);
    }
  }, [gameIsRunning]);

  const stopGameHandler = () => {
    setGameIsRunning(GameStatuses.stopped);
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
    console.log('RUN!');
    gameIsRunningRef.current = true;
    setGameIsRunning(GameStatuses.running);
  };

  useEffect(() => {
    if (score.player === 10 || score.skyNet === 10) {
      gameIsRunningRef.current = false;
    }
  }, [score]);

  useEffect(() => {
    const gameLoop = async () => {
      while (
        gameIsRunningRef.current &&
        gameIsRunning === GameStatuses.running
      ) {
        console.log('11111');
        // eslint-disable-next-line no-await-in-loop
        await delay(Number(roundDuration));
        roundHandler();
      }
    };
    gameLoop();
  }, [gameIsRunning]);

  const contextValue = useMemo(
    () => ({
      roundDuration,
      setRoundDuration,
      startHandler,
      resetHandler,
      gameIsRunning,
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
      gameIsRunning,
      stopGameHandler,
      score,
      setScore,
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
