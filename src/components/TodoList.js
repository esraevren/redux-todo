import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, deleteTodo } from "../redux/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);

  return (
    <ul className="todo-list">
      {/* <li className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>Learn JavaScript</label>
        <button className="destroy"></button>
      </div>
    </li> */}

      {items.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button className="destroy" onClick={()=>dispatch(deleteTodo(item.id))}></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
