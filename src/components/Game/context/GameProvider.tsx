import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo, useRef,
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

export enum GameStates {
  running = 'running',
  pending = 'pending',
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
  gameIsRunning: GameStates;
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
  const [gameIsRunning, setGameIsRunning] = useState<GameStates>(
    GameStates.stopped,
  );
  // const gameIntervalId = useRef<ReturnType<typeof setInterval>>();

  const [roundDuration, setRoundDuration] = useState<string>('');

  const resetHandler = () => {
    setScore(initialScore);
    setGameIsRunning(GameStates.pending);
    setAllCellsStatuses(initialCells);
  };

  const stopGameHandler = () => {
    setGameIsRunning(GameStates.pending);
  };

  const roundHandler = () => {
    const currentCellIndex = cellsForGame.shift();
    console.log('NEXT ROUND');
    setAllCellsStatuses((prevState) =>
      prevState.map((cell, index) => {
        if (index === currentCellIndex) {
          return CellStatus.pending;
        }

        return cell;
      }),
    );
  };

  const gameLoop = async (runOrStop: GameStates) => {
    while (runOrStop === GameStates.running) {
      console.log('in loop: ', gameIsRunning);
      // eslint-disable-next-line no-await-in-loop
      await delay(Number(roundDuration));
      roundHandler();
    }
  };
  gameLoop(gameIsRunning);

  const startHandler = () => {
    setGameIsRunning(GameStates.running);
    // round.current.id = setInterval(roundHandler, Number(roundDuration));
  };

  // console.log('OUTSIDE:', gameIsRunning);
  // useEffect(() => {
  //   console.log('USE_EFFECT:', gameIsRunning);
  //
  // }, [gameIsRunning]);

  useEffect(() => () => {
    setGameIsRunning(GameStates.stopped);
  });

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
