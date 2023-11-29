import { generateRandom } from 'helpers/generateRandom';

export const getInitialPositions = () =>
  Array(20)
    .fill(undefined)
    .reduce((previousValue, currentValue) => {
      const newCellPosition = generateRandom(previousValue);
      return [...previousValue, newCellPosition];
    }, []);
