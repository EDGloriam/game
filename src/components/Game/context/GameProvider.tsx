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
import { getInitialPositions } from '../../../helpers/getInitialPositions';
import { useInterval } from '../hook/useInterval';

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
  roundDurationChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  startHandler: () => void;
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
  const [roundDuration, setRoundDuration] = useState<string>('2000');
  const [nextIndex, setNextIndex] = useState(0);
  const { roundIntervalId, start } = useInterval(setNextIndex);
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
    start();
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

  const roundDurationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO add validation. Should be number
    setRoundDuration(event.target.value);
  };

  const contextValue = useMemo(
    () => ({
      score,
      // roundIntervalId,
      roundDuration,
      roundDurationChangeHandler,
      startHandler,
      resetHandler,
      gameIsRunning,
      cellsPositions,
      setCellPositions,
      setScore,
    }),
    [
      score,
      // roundIntervalId,
      roundDuration,
      roundDurationChangeHandler,
      startHandler,
      resetHandler,
      gameIsRunning,
      cellsPositions,
      setCellPositions,
      setScore,
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
