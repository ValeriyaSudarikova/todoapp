import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {addTodo, Todo, toggleTodo} from "../../core/store/to-do-slice";

export const useTodos = () => {
  const dispatch = useDispatch()

  const toAddToDo = useCallback((data: Todo) => {
    dispatch(addTodo(data));
  }, [dispatch]);

  const toToggleTodo = useCallback((id: string) => {
    dispatch(toggleTodo(id))
  }, [dispatch])

  return {
    toAddToDo,
    toToggleTodo
  }
}