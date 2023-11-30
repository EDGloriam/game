import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export const useInterval = (
  setNextCellIndex: Dispatch<SetStateAction<number>>,
  roundDuration: string,
) => {
  const roundIntervalId = useRef<ReturnType<typeof setInterval>>();

  const startGame = () => {
    clearInterval(roundIntervalId.current);
    roundIntervalId.current = setInterval(() => {
      console.log('interval');
      setNextCellIndex((prevState) => prevState + 1);
    }, Number(roundDuration));
  };

  const stopGame = () => {
    clearInterval(roundIntervalId.current);
  };

  useEffect(() => () => clearInterval(roundIntervalId.current), []);

  return {
    roundIntervalId,
    startGame,
    stopGame,
  };
};
