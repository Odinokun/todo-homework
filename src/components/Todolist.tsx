import React, { FC, ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TaskType } from '../App';
// import '../App.css';
import './Todolist.css';

interface IProps {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
}

export const Todolist: FC<IProps> = ({
  todolistId,
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  removeTodolist,
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
      addTask(newTaskTitle.trim(), todolistId);
      setNewTaskTitle('');
    } else {
      setError('This field is requered!');
    }
  };

  const changeAllFilter = () => changeFilter('all', todolistId);
  const changeActiveFilter = () => changeFilter('active', todolistId);
  const changeCompletedFilter = () => changeFilter('completed', todolistId);

  const removeTodolistHandler = () => removeTodolist(todolistId);

  return (
    <div>
      <div>
        <span>{title}</span>
        <button onClick={removeTodolistHandler}>del</button>
      </div>
      <br />
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
          const removeTaskHandler = () => removeTask(t.id, todolistId);
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
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
