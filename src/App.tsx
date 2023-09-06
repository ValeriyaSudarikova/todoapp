import React, {BaseSyntheticEvent, useCallback, useEffect, useRef, useState} from 'react';
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./index";
import {ToDoItem} from "./shared/ui/to-do-item/to-do-item";
import {addTodo, Todo, toggleTodo} from "./core/store/to-do-slice";
import { v4 as uuidv4 } from 'uuid';
import {useTodos} from "./shared/hooks/use-todos";
import {GetActiveTodos, GetDoneTodos} from "./shared/utils/ativeTabChanging";


function App() {
  const todos = useSelector((state: RootState) => state.todos as Todo[]);
  const [todoList, setTodoList ] = useState(todos);
  const [newTodo, setNewTodo] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("all")
  const {toAddToDo} = useTodos()

  useEffect(() => {
    const onActiveTab = new Map([
      ["all", todos],
      ["active", GetActiveTodos(todos)],
      ["done", GetDoneTodos(todos)]
    ])

    setTodoList(onActiveTab.get(activeTab) || [])
  }, [activeTab])

  useEffect(() => {
    setTodoList(todos)
    setActiveTab("all")
  }, [todos])

  useEffect(() => {
    if (newTodo) {
      const td:Todo = {id: uuidv4(), text: newTodo, completed: false};

      toAddToDo(td)
      setNewTodo(undefined)
      if (inputRef.current && inputRef.current.value) {
        inputRef.current.value = "";
      }
    }

  }, [newTodo])

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="App">
      <div className={"todo__wrapper"}>
        <div>
          <h1 className={"todo__wrapper-header"}>TODOS</h1>
          <ul className={"todo__wrapper-list"}>
            {todoList && todoList.length && todoList.map((todo) => (
              <ToDoItem key={todo.id} {...todo}/>
            ))}
          </ul>
        </div>
        <input
          ref={inputRef}
          className={"todo__wrapper-input"}
          placeholder={"Введите новое задание"}
          onKeyUp={(event) => {
            if (event.code === "Enter") {
              let e = event as BaseSyntheticEvent
              if (e.target.value) {
                setNewTodo(e.target.value)
              }
            }
          }
          }
          onBlur={(event: BaseSyntheticEvent) => event.target.value && setNewTodo(event.target.value)}
          />
        <div className={"footer__tabs"}>
          <button onClick={() => setActiveTab("all")}
                  className={activeTab === "all" ? "active" : undefined}>
            all
          </button>
          <button onClick={() => setActiveTab("active")}
                  className={activeTab === "active" ? "active" : undefined}>
            active
          </button>
          <button onClick={() => setActiveTab("done")}
                  className={activeTab === "completed" ? "active" : undefined}>
            completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
