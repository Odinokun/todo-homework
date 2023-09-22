import { FC, ChangeEvent } from 'react';
import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';

import { Delete } from '@mui/icons-material';

import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

import { FilterValuesType, TaskType } from '../App';

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
        <IconButton onClick={removeTodolistHandler} size='medium' color='error'>
          <Delete />
        </IconButton>
      </div>

      <br />

      <AddItemForm addItem={addTaskHandler} />

      <br />

      <div>
        <Button
          onClick={changeAllFilter}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color='primary'
        >
          All
        </Button>
        <Button
          onClick={changeActiveFilter}
          variant={filter === 'active' ? 'contained' : 'outlined'}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={changeCompletedFilter}
        >
          Completed
        </Button>
      </div>

      <List>
        {tasks.map(t => {
          const removeTaskHandler = () => removeTask(t.id, todolistId);
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
          const changeTaskTitleHandler = (newTitle: string) =>
            changeTaskTitle(t.id, newTitle, todolistId);
          return (
            <ListItem key={t.id} className={t.isDone ? 'is-done' : ''}>
              <Checkbox
                checked={t.isDone}
                onChange={changeTaskStatusHandler}
                color='success'
              />
              <IconButton
                onClick={removeTaskHandler}
                size='medium'
                color='error'
              >
                <Delete />
              </IconButton>
              <EditableSpan title={t.title} onChange={changeTaskTitleHandler} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
