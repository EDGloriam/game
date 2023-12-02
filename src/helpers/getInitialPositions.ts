import { getRandomIndex } from 'helpers/getRandomIndex';

export const getInitialPositions = () =>
  Array(19)
    .fill(undefined)
    .reduce((previousValue) => {
      const newIndexForCell = getRandomIndex(previousValue);
      return [...previousValue, newIndexForCell];
    }, []);
