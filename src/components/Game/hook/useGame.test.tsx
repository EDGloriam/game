import { renderHook } from '@testing-library/react';
import { useGame } from 'components/Game/hook/useGame';
import { Provider } from 'react-redux';

import { ReactNode } from 'react';
import gameReducer, {
  GameStatuses,
  updateGameStatus,
  initialGameState,
} from 'app/game/gameSlice';
import { RootState, setupStore, store } from 'app/store';
import { initialBoardState } from 'app/game/boardSlice';

const renderUseGame = (preloadedState: RootState) => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={setupStore(preloadedState)}>{children}</Provider>
  );
  const { result } = renderHook(() => useGame(), { wrapper });
  return { result, store };
};

describe('useGame hook', () => {
  test('it has correct initial state', () => {
    const { store: currentStore, result } = renderUseGame({
      game: initialGameState,
      board: initialBoardState,
    });

    expect(currentStore.getState()).toEqual({
      game: initialGameState,
      board: initialBoardState,
    });
  });

  test('the game starts', () => {
    expect(
      gameReducer(initialGameState, updateGameStatus(GameStatuses.running)),
    ).toEqual({
      ...initialGameState,
      gameStatus: GameStatuses.running,
    });
  });
});
