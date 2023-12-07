import React from 'react';
import { fireEvent, act, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

import { renderWithProviders } from 'utils/test-utils';
import Game from 'components/Game';

describe('Game', () => {
  test('it saves round duration time', async () => {
    const { getByLabelText } = renderWithProviders(<Game />, {});

    const roundDurationField = getByLabelText('Time (ms)') as HTMLInputElement;
    expect(roundDurationField).toBeInTheDocument();

    await act(() => {
      fireEvent.change(roundDurationField, {
        target: { value: '1000' },
      });
    });

    await waitFor(() => {
      expect(roundDurationField.value).toBe('1000');
    });
  });

  test('button Play changes to Reset when game starts', async () => {
    const { getByText, getByLabelText } = renderWithProviders(<Game />, {});

    const playButton = getByText('Play');
    const roundDurationField = getByLabelText('Time (ms)') as HTMLInputElement;

    await act(() => {
      fireEvent.change(roundDurationField, {
        target: { value: '1000' },
      });
    });

    await act(() => {
      fireEvent.click(playButton);
    });

    expect(getByText('Reset')).toBeInTheDocument();
  });
});
