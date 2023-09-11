import React, { FC, ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType } from '../App';
// import '../App.css';
import './Todolist.css';

interface IProps {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
  filter: FilterValuesType;
}

export const Todolist: FC<IProps> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('This field is requered!');
    }
  };

  const changeAllFilter = () => changeFilter('all');
  const changeActiveFilter = () => changeFilter('active');
  const changeCompletedFilter = () => changeFilter('completed');

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={inputChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>

      <br />

      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={changeAllFilter}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={changeActiveFilter}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={changeCompletedFilter}
        >
          Completed
        </button>
      </div>

      <ul>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id);
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(t.id, e.currentTarget.checked);
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={changeTaskStatusHandler}
              />
              <span>{t.title}</span>
              <button onClick={removeTaskHandler}>del</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
