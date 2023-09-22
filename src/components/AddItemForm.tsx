import { AddCircleOutline } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';

interface IProps {
  addItem: (title: string) => void;
}

export const AddItemForm: FC<IProps> = ({ addItem }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addItemHandler();
    }
  };

  const addItemHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('This field is requered!');
    }
  };

  return (
    <div>
      <TextField
        value={newTaskTitle}
        onChange={inputChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
        label='Type your text'
        variant='outlined'
        size='small'
        error={!!error}
        helperText={error}
      />
      <Button onClick={addItemHandler} size='medium' color='primary'>
        <AddCircleOutline />
      </Button>
    </div>
  );
};
