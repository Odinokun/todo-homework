import React, { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist';
import './App.css';
import { AddItemForm } from './components/AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId_1, title: 'What to learn', filter: 'all' },
    { id: todolistId_2, title: 'What to buy', filter: 'completed' },
  ]);

  const [tasks, setTasks] = React.useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Bread', isDone: false },
      { id: v1(), title: 'Water', isDone: false },
      { id: v1(), title: 'Tomato', isDone: false },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== id),
    });
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map(tl =>
        tl.id === todolistId ? { ...tl, filter: value } : tl
      )
    );
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const changeTaskStatus = (
    id: string,
    isDone: boolean,
    todolistId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t =>
        t.id === id ? { ...t, isDone } : t
      ),
    });
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasks[todolistId];
  };

  const addTodolist = (title: string) => {
    const newTodolistId = v1();
    const newTodolist: TodolistType = {
      id: newTodolistId,
      title,
      filter: 'all',
    };
    setTodolists([...todolists, newTodolist]);
    setTasks({ [newTodolistId]: [], ...tasks });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    setTodolists(todolists.map(tl => (tl.id === id ? { ...tl, title } : tl)));
  };

  const changeTaskTitle = (id: string, title: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t =>
        t.id === id ? { ...t, title } : t
      ),
    });
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container sx={{ padding: '30px 0' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map(tl => {
            const filteredTask = () => {
              switch (tl.filter) {
                case 'active':
                  return tasks[tl.id].filter(t => !t.isDone);
                case 'completed':
                  return tasks[tl.id].filter(t => t.isDone);
                default:
                  return tasks[tl.id];
              }
            };

            return (
              <Grid item xs={4}>
                <Paper elevation={3} style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={filteredTask()}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
