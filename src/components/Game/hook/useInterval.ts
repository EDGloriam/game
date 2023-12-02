import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export const useInterval = (roundDuration: string) => {
  console.log(1);
  // const roundIntervalId = useRef<ReturnType<typeof setInterval>>();
  //
  // const startGame = () => {
  //   clearInterval(roundIntervalId.current);
  //   roundIntervalId.current = setInterval(() => {}, Number(roundDuration));
  // };
  //
  // const stopGame = () => {
  //   clearInterval(roundIntervalId.current);
  // };
  //
  // useEffect(() => () => clearInterval(roundIntervalId.current), []);

  return {
    // roundIntervalId,
    // startGame,
    // stopGame,
  };
};
