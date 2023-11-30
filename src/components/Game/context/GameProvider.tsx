import {
  useState,
  FC,
  useMemo,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { getInitialPositions } from 'helpers/getInitialPositions';
import { useInterval } from 'components/Game/hook/useInterval';

export type Position = {
  col: number;
  row: number;
  initialised: boolean;
};

interface GameProviderProps {
  children?: ReactNode;
}

type Score = {
  player: number;
  skyNet: number;
};

interface GameContextType {
  score: Score;
  setScore: Dispatch<SetStateAction<Score>>;
  roundDuration: string;
  setRoundDuration: Dispatch<SetStateAction<string>>;
  startHandler: () => void;
  stopGameHandler: () => void;
  resetHandler: () => void;
  gameIsRunning: boolean;
  cellsPositions: Array<Position>;
}

export const GameContext = createContext({} as GameContextType);

export const useGameContext = () => useContext(GameContext);

const initialScore = {
  player: 0,
  skyNet: 0,
};

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [score, setScore] = useState<Score>(initialScore);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [roundDuration, setRoundDuration] = useState<string>('');
  const [nextIndex, setNextIndex] = useState(0);
  const { roundIntervalId, startGame, stopGame } = useInterval(
    setNextIndex,
    roundDuration,
  );
  const [cellsPositions, setCellPositions] = useState<Array<Position>>(
    getInitialPositions(),
  );

  const resetHandler = () => {
    setGameIsRunning(false);
    clearInterval(roundIntervalId.current);
    setCellPositions([]);
    setScore(initialScore);
  };

  const startHandler = () => {
    setGameIsRunning(true);
    startGame();
  };

  const stopGameHandler = () => {
    setGameIsRunning(false);
    stopGame();
  };

  useEffect(() => {
    if (gameIsRunning) {
      setCellPositions((prevState) =>
        prevState.map((cell, index) => {
          if (index === nextIndex) {
            return {
              ...cell,
              initialised: true,
            };
          }
          return cell;
        }),
      );
    }
  }, [nextIndex, gameIsRunning]);

  const contextValue = useMemo(
    () => ({
      score,
      roundDuration,
      setRoundDuration,
      startHandler,
      resetHandler,
      gameIsRunning,
      cellsPositions,
      setCellPositions,
      setScore,
      stopGameHandler,
    }),
    [
      score,
      roundDuration,
      setRoundDuration,
      startHandler,
      resetHandler,
      gameIsRunning,
      cellsPositions,
      setCellPositions,
      setScore,
      stopGameHandler,
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
