import React, {useState} from "react";
import {Todo} from "../../../core/store/to-do-slice";
import {useTodos} from "../../hooks/use-todos";
import styles from "./to-do-item.module.scss";
import cn from "classnames";
import done from '../../../assets/img/done.svg'

export const ToDoItem: React.FC<Todo> = ({id, text, completed}) => {
  const {toToggleTodo} = useTodos()

  return (
    <li className={cn(
      styles.wrapper, {
        [styles.checked]: completed
      }
    )}
      onClick={() => toToggleTodo(id)}>
      <span className={styles.text}>{text}</span>
      {completed && <img src={done} alt={"иконка выполнено"} className={styles.icon}/>}
    </li>
  )
}