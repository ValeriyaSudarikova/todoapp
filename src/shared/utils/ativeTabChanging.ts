import {Todo} from "../../core/store/to-do-slice";

export const GetActiveTodos = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed)
}
export const GetDoneTodos = (todos: Todo[]) => {
  return todos.filter(todo => todo.completed)
}