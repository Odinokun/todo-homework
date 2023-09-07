import React, { FC } from 'react';
import { FilterValuesType, TaskType } from '../App';

interface IProps {
  title: string;
  tasks: TaskType[];
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesType) => void;
}

export const Todolist: FC<IProps> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.map(t => {
          return (
            <li key={t.id}>
              <input type='checkbox' checked={t.isDone} />{' '}
              <span>{t.title}</span>
              <button onClick={() => removeTask(t.id)}>del</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};
