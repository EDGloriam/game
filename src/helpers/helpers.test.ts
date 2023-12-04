import { getRandomIndex } from './getRandomIndex';
import { getInitialPositions } from './getInitialPositions';

describe('getRandomIndex', () => {
  let mockMath: jest.Mocked<Math>;

  beforeEach(() => {
    mockMath = Object.create(global.Math) as jest.Mocked<Math>;
    mockMath.random = jest.fn();
    global.Math = mockMath;
  });

  test('returns a different index on consecutive calls with the same existingIndexes', () => {
    mockMath.random.mockReturnValueOnce(0.5).mockReturnValueOnce(0.7);

    const existingIndexes: number[] = [1, 2, 3, 4, 5];
    const result1 = getRandomIndex(existingIndexes);
    const result2 = getRandomIndex(existingIndexes);

    expect(result1).not.toEqual(result2);
  });

  test('returns a valid index when the existingIndexes array is empty', () => {
    mockMath.random.mockReturnValue(0.3);

    const existingIndexes: number[] = [];
    const result = getRandomIndex(existingIndexes);

    expect(result).toBe(30);
  });
});

describe('getInitialPositions', () => {
  let mockMath: jest.Mocked<Math>;

  beforeEach(() => {
    mockMath = Object.create(global.Math) as jest.Mocked<Math>;
    mockMath.random = jest.fn();
    global.Math = mockMath;
  });

  it('should return an array of 3 unique random numbers', () => {
    const numberOfPositions = 3;
    mockMath.random
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.7)
      .mockReturnValueOnce(0.9);

    const initialPositions: number[] = getInitialPositions(3);

    expect(initialPositions.length).toBe(numberOfPositions);

    const uniquePositions = new Set(initialPositions);
    expect(uniquePositions.size).toBe(numberOfPositions);

    expect(
      initialPositions.every((position) => position >= 0 && position < 100),
    ).toBe(true);
  });
});
