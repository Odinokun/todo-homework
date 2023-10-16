import { FilterValuesType, TodolistType } from '../App';
import { v1 } from 'uuid';

export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.payload.id);
    case 'ADD-TODOLIST':
      const newTodolist: TodolistType = { id: v1(), title: action.payload.title, filter: 'all' };
      return [...state, newTodolist];
    case 'CHANGE-TITLE':
      return state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl);
    case 'CHANGE-FILTER':
      return state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl);
    default:
      return state;
  }
};

type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: { id: todolistId },
  } as const;
};

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: { title },
  } as const;
};

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE-TITLE',
    payload: { id: todolistId, title: title },
  } as const;
};

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: { id: todolistId, filter },
  } as const;
};