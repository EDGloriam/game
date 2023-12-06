import React, { ChangeEvent, useEffect, useId, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';

import Cell from 'components/Cell';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { SCORE_LIMIT } from 'constants/Game';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectorsGame } from 'app/game/selectors';
import { useGame } from 'components/Game/hook/useGame';
import { GameStatuses, updateRoundDurationTime } from 'app/game/gameSlice';

interface IFormInput {
  roundDuration: string;
}

const schema = yup.object().shape({
  roundDuration: yup
    .string()
    .required('Time is a required field')
    .matches(/^\d+$/, 'Only numbers allowed'),
});

const MainWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px auto',
  maxWidth: 718,
}));

const Board = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 70px)',
  gap: 2,
  marginTop: 10,
}));

const Score = styled(Typography)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 30px 10px 30px',
  gap: '2px',
  justifyItems: 'center',
}));

const Controls = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '160px 1fr 160px',
  justifyItems: 'center',
  alignItems: 'flex-end',
  marginTop: 20,
  width: '100%',

  '& .MuiButton-root': {
    justifySelf: 'end',
  },
}));

const Game = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });
  const score = useAppSelector(selectorsGame.score);
  const cells = useAppSelector(selectorsGame.cells);
  const gameStatus = useAppSelector(selectorsGame.gameStatus);
  const { resetHandler, stopGameHandler, startHandler } = useGame();
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);

  const toggleResultModal = () => setResultModalIsOpen(!resultModalIsOpen);

  const timeChangeHandler = (value: string) => {
    dispatch(updateRoundDurationTime(value));
  };

  const win = score.player > score.skyNet;

  const playAgain = () => {
    resetHandler();
    toggleResultModal();
  };

  const playHandler = () => {
    if (isValid) {
      startHandler();
    } else {
      trigger();
    }
  };

  useEffect(() => {
    if (score.player === SCORE_LIMIT || score.skyNet === SCORE_LIMIT) {
      toggleResultModal();
      stopGameHandler();
    }
  }, [score]);

  return (
    <MainWrapper>
      <form>
        <Controls>
          <Controller
            control={control}
            name="roundDuration"
            defaultValue=""
            render={({
              field,
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <TextField
                data-testid="time"
                {...field}
                label="Time (ms)"
                placeholder="Enter time"
                type="text"
                variant="standard"
                error={!!errors.roundDuration}
                helperText={errors.roundDuration?.message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (!invalid) {
                    timeChangeHandler(e.target.value);
                  }
                  field.onChange(e);
                }}
              />
            )}
          />

          <Score variant="h3" data-testid="score">
            Score: <span>{score.player}</span> /<span>{score.skyNet}</span>
          </Score>

          {gameStatus !== GameStatuses.pending ? (
            <Button color="error" variant="contained" onClick={resetHandler}>
              Reset
            </Button>
          ) : (
            <Button onClick={playHandler} data-testid="play">
              Play
            </Button>
          )}
        </Controls>
      </form>

      <Board>
        {cells.map((status) => (
          <Cell key={useId()} status={status} />
        ))}
      </Board>

      <Modal open={resultModalIsOpen} onClose={toggleResultModal}>
        <Typography variant="h6" color={win ? 'secondary' : 'error'}>
          {win ? 'Congratulations! You won.' : 'Oh, what a pity! You lose.'}
        </Typography>
        <Typography sx={{ mt: 2 }}>Would you like to try again?</Typography>
        <Modal.Footer>
          <Button onClick={toggleResultModal} variant="outlined">
            Close
          </Button>
          <Button onClick={playAgain}>Play again</Button>
        </Modal.Footer>
      </Modal>
    </MainWrapper>
  );
};

export default Game;
