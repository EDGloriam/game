import React, { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from 'app/store';
import { setupStore } from 'app/store';
import { initialGameState } from '../app/game/gameSlice';
import { initialBoardState } from '../app/game/boardSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
  preloadedState?: RootState;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {
      game: initialGameState,
      board: initialBoardState,
    },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions,
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): ReactElement => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
