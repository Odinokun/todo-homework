import React, { FC } from 'react';
import { FilterValuesType, TaskType } from '../App';

interface IProps {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
}

export const Todolist: FC<IProps> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = React.useState<string>('');

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
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
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id);
          return (
            <li key={t.id}>
              <input type='checkbox' checked={t.isDone} />{' '}
              <span>{t.title}</span>
              <button onClick={removeTaskHandler}>del</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={changeAllFilter}>All</button>
        <button onClick={changeActiveFilter}>Active</button>
        <button onClick={changeCompletedFilter}>Completed</button>
      </div>
    </div>
  );
};
