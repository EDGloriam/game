import gameReducer, {
  Game,
  GameStatuses,
  updateGameStatus,
  initialGameState,
  pointToPlayer,
  resetGame,
  pointToSkyNet,
} from 'app/game/gameSlice';

describe('game reducer', () => {
  test('update game status works', () => {
    expect(
      gameReducer(initialGameState, updateGameStatus(GameStatuses.running)),
    ).toEqual({
      ...initialGameState,
      gameStatus: GameStatuses.running,
    });
  });

  test('add point to player', () => {
    expect(gameReducer(initialGameState, pointToPlayer())).toEqual({
      ...initialGameState,
      score: {
        ...initialGameState.score,
        player: 1,
      },
    });
  });

  test('add point to skyNet', () => {
    expect(gameReducer(initialGameState, pointToSkyNet())).toEqual({
      ...initialGameState,
      score: {
        ...initialGameState.score,
        skyNet: 1,
      },
    });
  });

  test('reset game works', () => {
    const previousState: Game = {
      score: {
        player: 10,
        skyNet: 0,
      },
      roundDuration: 300,
      gameStatus: GameStatuses.running,
    };

    expect(gameReducer(previousState, resetGame())).toEqual({
      ...initialGameState,
      roundDuration: 300,
    });
  });
});
