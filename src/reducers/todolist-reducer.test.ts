import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer,
} from './todolist-reducer';
import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

test('correct todolist should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  
  const endState = todolistReducer(startState, removeTodolistAC(todolistId1));
  
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
  expect(endState[0].title).toBe('What to buy');
});

test('correct todolist should be added', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newTodolistTitle: string = 'New Todolist';
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  
  const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));
  
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newTodolistTitle: string = 'New Todolist';
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  
  const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));
  
  expect(endState.length).toBe(2);
  expect(endState[1].title).toBe(newTodolistTitle);
  expect(endState[1].filter).toBe('all');
});

test('filter of todolist should be changed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newFilter: FilterValuesType = 'completed';
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  
  const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));
  
  expect(endState.length).toBe(2);
  expect(endState[1].title).toBe('What to buy');
  expect(endState[1].filter).toBe(newFilter);
});