// force the state to clear with fast refresh in Expo
// @refresh reset

import React, { useEffect, createContext, useState } from 'react';
import {database} from '../database'

export const TodosContext = createContext({});

export const TodosContextProvider = props => {
  // Initial values are obtained from the props
  const {
    todos: initialTodos,
    children
  } = props;

  // Use State to store the values
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    refreshTodos()
  }, [] )

  const addNewTodo = (title, createdDate) => {
    return database.insertTodo(title, createdDate, refreshTodos)
  };

  const removeTodo = (id) => {
    return database.deleteTodo(id, refreshTodos)
  }

  const refreshTodos = () =>  {
    return database.getTodos(setTodos)
  }

  // Make the context object:
  const todosContext = {
    todos,
    removeTodo,
    addNewTodo
  };

  // pass the value in provider and return
  return <TodosContext.Provider value={todosContext}>{children}</TodosContext.Provider>;
};