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
      <input
        value={newTaskTitle}
        onChange={inputChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addItemHandler}>+</button>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};
