import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export const useInterval = (
  setNextIndex: Dispatch<SetStateAction<number>>,
  roundDuration: string,
) => {
  const roundIntervalId = useRef<ReturnType<typeof setInterval>>();
  const nextIndex = useRef<number>(0);

  const startGame = () => {
    clearInterval(roundIntervalId.current);
    roundIntervalId.current = setInterval(() => {
      setNextIndex((prevState) => prevState + 1);
    }, Number(roundDuration));
  };

  const stopGame = () => {
    clearInterval(roundIntervalId.current);
  };

  useEffect(() => () => clearInterval(roundIntervalId.current), []);

  return {
    nextIndex: nextIndex.current,
    roundIntervalId,
    startGame,
    stopGame,
  };
};
