import {
  useState,
  FC,
  useMemo,
  createContext,
  ReactNode,
  useContext,
  useEffect,
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
  cellsParams: Array<Position>;
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
  const [nextCellIndex, setNextCellIndex] = useState(0);
  const { roundIntervalId, startGame, stopGame } = useInterval(
    setNextCellIndex,
    roundDuration,
  );
  const [cellsParams, setCellPrams] = useState<Array<Position>>(
    getInitialPositions(),
  );

  const resetHandler = () => {
    setGameIsRunning(false);
    clearInterval(roundIntervalId.current);
    setCellPrams([]);
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
      setCellPrams((prevState) =>
        prevState.map((cell, index) => {
          if (index === nextCellIndex) {
            return {
              ...cell,
              initialised: true,
            };
          }
          return cell;
        }),
      );
    }
  }, [nextCellIndex, gameIsRunning]);

  console.log('n: ', nextCellIndex);

  const contextValue = useMemo(
    () => ({
      score,
      roundDuration,
      setRoundDuration,
      startHandler,
      resetHandler,
      gameIsRunning,
      cellsParams,
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
      cellsParams,
      setScore,
      stopGameHandler,
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
