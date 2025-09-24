import { SET_TODOS, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from '../reducers/todo.reducer.js'
export const setTodos = (todos) => ({ type: SET_TODOS, todos })
export const addTodo = (todo) => ({ type: ADD_TODO, todo })
export const updateTodo = (todo) => ({ type: UPDATE_TODO, todo })
export const removeTodo = (todoId) => ({ type: REMOVE_TODO, todoId })
