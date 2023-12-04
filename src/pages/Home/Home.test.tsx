// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

import Home from './index';

describe('Home', () => {
  test('renders necessary elements', () => {
    render(<Home />);

    const roundDurationInput = screen.getByTestId('time');
    expect(roundDurationInput).toBeInTheDocument();

    const scoreText = screen.getByTestId('score');
    expect(scoreText).toBeInTheDocument();

    const playButton = screen.getByTestId('play');
    expect(playButton).toBeInTheDocument();

    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(100);
  });
});
