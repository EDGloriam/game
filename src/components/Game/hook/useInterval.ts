import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export const useInterval = (setNextIndex: Dispatch<SetStateAction<number>>) => {
  const roundIntervalId = useRef<ReturnType<typeof setInterval>>();
  const nextIndex = useRef<number>(0);

  const start = () => {
    roundIntervalId.current = setInterval(() => {
      setNextIndex((prevState) => prevState + 1);
    }, 2000);
  };

  useEffect(() => () => clearInterval(roundIntervalId.current), []);

  return {
    nextIndex: nextIndex.current,
    roundIntervalId,
    start,
  };
};
