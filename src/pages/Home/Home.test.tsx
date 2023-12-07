// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

import Home from 'pages/Home';
import { renderWithProviders } from 'utils/test-utils';

describe('Home', () => {
  test('renders necessary elements', () => {
    const { getByLabelText, getAllByTestId, getByText } = renderWithProviders(
      <Home />,
      {},
    );
    const roundDurationInput = getByLabelText('Time (ms)');
    expect(roundDurationInput).toBeInTheDocument();

    const scoreText = getByText((content) => content.startsWith('Score: '));
    expect(scoreText).toBeInTheDocument();

    const playButton = getByText('Play');
    expect(playButton).toBeInTheDocument();

    const cells = getAllByTestId('cell');
    expect(cells).toHaveLength(100);
  });
});
