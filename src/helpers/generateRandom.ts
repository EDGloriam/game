import { Position } from 'components/Game/context/GameProvider';

export const generateRandom = (forbiddenNumbers: Array<Position>): Position => {
  const col: number = Math.floor(Math.random() * 10);
  const row: number = Math.floor(Math.random() * 10);

  if (
    forbiddenNumbers.length &&
    forbiddenNumbers.find(
      (position) => position.col === col && position.row === row,
    )
  ) {
    return generateRandom(forbiddenNumbers);
  }

  return {
    col,
    row,
    initialised: false,
  };
};
