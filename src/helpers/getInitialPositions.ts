import { getRandomIndex } from 'helpers/getRandomIndex';
import { SCORE_LIMIT } from '../constants/Game';

export const getInitialPositions = (size: number = SCORE_LIMIT * 2) =>
  Array(size)
    .fill(undefined)
    .reduce((previousValue) => {
      const newIndexForCell = getRandomIndex(previousValue);
      return [...previousValue, newIndexForCell];
    }, []);
