import { getRandomIndex } from 'helpers/getRandomIndex';

export const getInitialPositions = (size: number = 20) =>
  Array(size)
    .fill(undefined)
    .reduce((previousValue) => {
      const newIndexForCell = getRandomIndex(previousValue);
      return [...previousValue, newIndexForCell];
    }, []);
