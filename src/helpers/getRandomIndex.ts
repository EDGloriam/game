export const getRandomIndex = (existingIndexes: Array<number>): number => {
  const newPositionIndex: number = Math.floor(Math.random() * 100);

  if (
    existingIndexes.length &&
    existingIndexes.find((position) => position === newPositionIndex)
  ) {
    return getRandomIndex(existingIndexes);
  }

  return newPositionIndex;
};
