import { FC, ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
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
  changeTaskTitle: (id: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (id: string, title: string) => void;
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
  changeTaskTitle,
  changeTodolistTitle,
}) => {
  const addTaskHandler = (newTaskTitle: string) => {
    addTask(newTaskTitle.trim(), todolistId);
  };

  const changeAllFilter = () => changeFilter('all', todolistId);
  const changeActiveFilter = () => changeFilter('active', todolistId);
  const changeCompletedFilter = () => changeFilter('completed', todolistId);

  const removeTodolistHandler = () => removeTodolist(todolistId);

  const changeTodolistTitleHandler = (newTitle: string) =>
    changeTodolistTitle(todolistId, newTitle);

  return (
    <div>
      <div>
        <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
        <button onClick={removeTodolistHandler}>del</button>
      </div>

      <br />

      <AddItemForm addItem={addTaskHandler} />

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
          const changeTaskTitleHandler = (newTitle: string) =>
            changeTaskTitle(t.id, newTitle, todolistId);
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={changeTaskStatusHandler}
              />
              <button onClick={removeTaskHandler}>del</button>
              <EditableSpan title={t.title} onChange={changeTaskTitleHandler} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
