import React, { ChangeEvent, useEffect, useId, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';

import Cell from 'components/Cell';
import {
  GameStatuses,
  useGameContext,
} from 'components/Game/context/GameProvider';
import Modal from 'components/Modal';
import Button from 'components/Button';

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

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

const Controls = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: 20,
  width: '100%',
}));

const Game = () => {
  const {
    watch,
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onChange' });
  // const roundDuration = watch(['roundDuration']);
  const {
    resetHandler,
    stopGameHandler,
    setRoundDuration,
    startHandler,
    allCellsStatuses,
    gameIsRunning,
    score,
  } = useGameContext();
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
  const toggleResultModal = () => setResultModalIsOpen(!resultModalIsOpen);

  useEffect(() => {
    if (score.player === 10 || score.skyNet === 10) {
      toggleResultModal();
      stopGameHandler();
    }
  }, [score]);

  const playAgain = () => {
    startHandler();
    toggleResultModal();
  };

  const timeChangeHandler = (value: string) => {
    setRoundDuration(value);
  };

  const win = score.player > score.skyNet;

  const playHandler = () => {
    if (isValid) {
      startHandler();
    } else {
      trigger();
    }
  };

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

          <Typography variant="h3">
            Score: {score.player} / {score.skyNet}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {gameIsRunning !== GameStatuses.pending ? (
              <Button variant="contained" onClick={resetHandler}>
                Reset
              </Button>
            ) : (
              <Button onClick={playHandler}>Play</Button>
            )}
          </Box>
        </Controls>
      </form>
      <Board>
        {allCellsStatuses.map((status) => (
          <Cell key={useId()} status={status} />
        ))}
      </Board>
      <Modal open={resultModalIsOpen} onClose={toggleResultModal}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color={win ? 'secondary' : 'error'}>
          {win ? 'Congratulations! You won.' : 'Oh, what a pity! You lose.'}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Would you like to try again?
        </Typography>
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
