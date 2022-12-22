import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, deleteTodo, getTodosAsync } from "../redux/todos/todosSlice";
let filtered = [];

const TodoList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error=useSelector((state)=>state.todos.error)
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const activeFilter = useSelector((state) => state.todos.activeFilter);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteTodo(id));
    }
  };

  if(isLoading){
      return <div style={{fontSize:18, padding:15}}>Loading...</div>
  }

  if(error){
    return <div style={{fontSize:18, padding:15}}>{error} </div>
  }

  filtered = items;
  if (activeFilter !== "all") {
    filtered = items.filter((todo) =>
      activeFilter === "active"
        ? todo.completed == false
        : todo.completed == true
    );
  }

  return (
    <ul className="todo-list">
      {/* <li className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>Learn JavaScript</label>
        <button className="destroy"></button>
      </div>
    </li> */}

      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDelete(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
