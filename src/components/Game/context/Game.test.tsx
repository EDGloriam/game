// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { GameProvider, GameContext } from './GameProvider';

jest.mock('helpers/delay', () => ({
  delay: jest.fn(() => Promise.resolve()),
}));

describe('GameProvider', () => {
  it('should start the game when startHandler is called', async () => {
    const TestComponent = () => {
      const { startHandler, gameStatus } = useContext(GameContext);

      return (
        <div>
          <span>{gameStatus}</span>
          <Button onClick={() => act(() => startHandler())}>Start Game</Button>
        </div>
      );
    };

    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    const pending = screen.getByText('pending');
    expect(pending).toBeInTheDocument();

    const start = screen.getByText('Start Game');
    fireEvent.click(start);

    const running = screen.getByText('running');
    expect(running).toBeInTheDocument();
  });

  it('should stop the game when resetHandler is called', async () => {
    const TestComponent = () => {
      const { startHandler, resetHandler, gameStatus } =
        useContext(GameContext);

      return (
        <div>
          <span>{gameStatus}</span>
          <Button onClick={() => act(() => startHandler())}>Start Game</Button>
          <Button onClick={() => act(() => resetHandler())}>Reset</Button>
        </div>
      );
    };

    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    const start = screen.getByText('Start Game');
    fireEvent.click(start);

    const running = screen.getByText('running');
    expect(running).toBeInTheDocument();

    const reset = screen.getByText('Reset');
    fireEvent.click(reset);

    const pending = screen.getByText('pending');
    expect(pending).toBeInTheDocument();
  });
});
