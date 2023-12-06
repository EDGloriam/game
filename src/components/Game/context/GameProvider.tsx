import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CellStatus } from 'components/Cell';
import {
  initialCells,
  initialScore,
  useGame,
} from 'components/Game/hook/useGame';

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

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [score, setScore] = useState<Score>(initialScore);
  const [roundDuration, setRoundDuration] = useState<number | undefined>();
  const [allCellsStatuses, setAllCellsStatuses] =
    useState<CellStatus[]>(initialCells);
  const [gameStatus, setGameStatus] = useState<GameStatuses>(
    GameStatuses.pending,
  );
  const { startHandler, resetHandler, stopGameHandler } = useGame({
    roundDuration,
    score,
    setScore,
    setAllCellsStatuses,
    setGameStatus,
    gameStatus,
  });

  const contextValue = useMemo(
    () => ({
      roundDuration,
      setRoundDuration,
      startHandler,
      resetHandler,
      stopGameHandler,
      gameStatus,
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
