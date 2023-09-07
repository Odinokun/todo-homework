import React from 'react';
import './App.css';
import { Todolist } from './components/Todolist';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = React.useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Rest API', isDone: false },
    { id: 5, title: 'GraphQL', isDone: false },
  ]);
  const [filter, setFilter] = React.useState<FilterValuesType>();

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  } else if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  return (
    <div className='App'>
      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
